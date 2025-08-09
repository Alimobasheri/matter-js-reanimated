import { FC } from 'react';
import {
  useFrameCallback,
  useSharedValue,
  runOnUI,
  SharedValue,
} from 'react-native-reanimated';

/**
 * Interface for the runner's options.
 */
interface RunnerOptions {
  delta?: number;
  frameDeltaSmoothing?: boolean;
  frameDeltaSnapping?: boolean;
  frameDeltaHistorySize?: number;
  maxUpdates?: number | null;
  maxFrameTime?: number;
  enabled?: boolean;
}

/**
 * Interface for the internal state of the runner, stored in a SharedValue.
 */
interface RunnerState {
  delta: number;
  frameDelta: number | null;
  frameDeltaSmoothing: boolean;
  frameDeltaSnapping: boolean;
  frameDeltaHistory: number[];
  frameDeltaHistorySize: number;
  frameRequestId: number | null;
  timeBuffer: number;
  timeLastTick: number | null;
  maxUpdates: number | null;
  maxFrameTime: number;
  lastUpdatesDeferred: number;
  enabled: boolean;
  fps: number;
}

// Assuming these Matter.js interfaces are declared globally elsewhere,
// as per the user's previous instruction.
// Example of how they might be defined (not part of this file's output):
// declare namespace Matter {
//   interface Engine {
//     timing: {
//       timestamp: number;
//       lastUpdatesPerFrame: number; // Added this property
//     };
//     update: (engine: Engine, delta: number) => void;
//     world: any;
//   }
//   interface Events {
//     trigger: (source: any, name: string, event: any) => void;
//   }
//   // Add other Matter.js interfaces as needed
// }

/**
 * Worklet function to calculate the mean of an array of numbers.
 * @param {number[]} values - The array of numbers.
 * @returns {number} The mean of the given values.
 */
const _mean = (values: number[]): number => {
  'worklet';
  let result = 0;
  const valuesLength = values.length;
  for (let i = 0; i < valuesLength; i += 1) {
    result += values[i];
  }
  return result / valuesLength || 0;
};

/**
 * Worklet function to clamp a value between a minimum and maximum.
 * @param {number} value - The value to clamp.
 * @param {number} min - The minimum allowed value.
 * @param {number} max - The maximum allowed value.
 * @returns {number} The clamped value.
 */
const _clamp = (value: number, min: number, max: number): number => {
  'worklet';
  return Math.max(min, Math.min(value, max));
};

/**
 * Worklet function for a single runner tick. This function is designed to run on the UI thread.
 * It updates the Matter.js engine based on the elapsed time.
 * @param {RunnerState} runnerValue - The runner object (mutable). This is the .value of the shared value.
 * @param {string} engineId - The ID of the Matter.js engine object in the global scope.
 * @param {number} time - The current timestamp.
 */
const tickWorklet = (
  runnerValue: RunnerState,
  engineId: string,
  time: number
) => {
  'worklet';

  // Ensure Matter.js and the engine are available in the global scope
  if (
    !global.MatterReanimated ||
    !global.MatterToolsReanimated ||
    !(engineId in global.MatterToolsReanimated)
  )
    return;

  const engine: Matter.Engine = (global.MatterToolsReanimated as any)[engineId];
  if (!engine || !engine.world) return; // Check for engine and its world property

  // Access Matter.js modules from global scope
  const { Events, Engine, Common } = global.MatterReanimated;

  const _maxFrameDelta = 1000 / 15;
  const _frameDeltaFallback = 1000 / 60;
  const _timeBufferMargin = 1.5;
  const _elapsedNextEstimate = 1;
  const _smoothingLowerBound = 0.1;
  const _smoothingUpperBound = 0.9;

  let tickStartTime = global.performance.now(); // Use global.performance.now() for UI thread
  let engineDelta = runnerValue.delta;
  let updateCount = 0;

  // Find frame delta time since last call
  let frameDelta = time - (runnerValue.timeLastTick || 0); // Handle null for initial tick

  // Fallback for unusable frame delta values (e.g. 0, NaN, on first frame or long pauses)
  if (
    !frameDelta ||
    !runnerValue.timeLastTick ||
    frameDelta > Math.max(_maxFrameDelta, runnerValue.maxFrameTime)
  ) {
    // Reuse last accepted frame delta else fallback
    frameDelta = runnerValue.frameDelta || _frameDeltaFallback;
  }

  if (runnerValue.frameDeltaSmoothing) {
    // Record frame delta over a number of frames
    runnerValue.frameDeltaHistory.push(frameDelta);
    runnerValue.frameDeltaHistory = runnerValue.frameDeltaHistory.slice(
      -runnerValue.frameDeltaHistorySize
    );

    // Sort frame delta history
    const deltaHistorySorted = runnerValue.frameDeltaHistory
      .slice(0)
      .sort((a, b) => a - b);

    // Sample a central window to limit outliers
    const deltaHistoryWindow = deltaHistorySorted.slice(
      Math.floor(deltaHistorySorted.length * _smoothingLowerBound),
      Math.floor(deltaHistorySorted.length * _smoothingUpperBound)
    );

    // Take the mean of the central window
    const frameDeltaSmoothed = _mean(deltaHistoryWindow);
    frameDelta = frameDeltaSmoothed || frameDelta;
  }

  if (runnerValue.frameDeltaSnapping) {
    // Snap frame delta to the nearest 1 Hz
    frameDelta = 1000 / Math.round(1000 / frameDelta);
  }

  // Update runner values for next call
  runnerValue.frameDelta = frameDelta;
  runnerValue.timeLastTick = time;

  // Accumulate elapsed time
  runnerValue.timeBuffer += runnerValue.frameDelta;

  // Limit time buffer size to a single frame of updates
  runnerValue.timeBuffer = _clamp(
    runnerValue.timeBuffer,
    0,
    runnerValue.frameDelta + engineDelta * _timeBufferMargin
  );

  // Reset count of over budget updates
  runnerValue.lastUpdatesDeferred = 0;

  // Get max updates per frame
  const maxUpdates =
    runnerValue.maxUpdates || Math.ceil(runnerValue.maxFrameTime / engineDelta);

  // Create event object
  const event = {
    timestamp: engine.timing.timestamp,
  };

  // Tick events before update
  Events.trigger(runnerValue, 'beforeTick', event);
  Events.trigger(runnerValue, 'tick', event);

  let updateStartTime = global.performance.now();

  // Simulate time elapsed between calls
  while (
    engineDelta > 0 &&
    runnerValue.timeBuffer >= engineDelta * _timeBufferMargin
  ) {
    // Update the engine
    Events.trigger(runnerValue, 'beforeUpdate', event);
    Engine.update(engine, engineDelta);
    Events.trigger(runnerValue, 'afterUpdate', event);

    // Consume time simulated from buffer
    runnerValue.timeBuffer -= engineDelta;
    updateCount += 1;

    // Find elapsed time during this tick
    const elapsedTimeTotal = global.performance.now() - tickStartTime;
    const elapsedTimeUpdates = global.performance.now() - updateStartTime;
    const elapsedNextEstimate =
      elapsedTimeTotal +
      (_elapsedNextEstimate * elapsedTimeUpdates) / updateCount;

    // Defer updates if over performance budgets for this frame
    if (
      updateCount >= maxUpdates ||
      elapsedNextEstimate > runnerValue.maxFrameTime
    ) {
      runnerValue.lastUpdatesDeferred = Math.round(
        Math.max(0, runnerValue.timeBuffer / engineDelta - _timeBufferMargin)
      );
      break;
    }
  }

  // Track timing metrics
  // @ts-ignore
  engine.timing.lastUpdatesPerFrame = updateCount;

  // Tick events after update
  Events.trigger(runnerValue, 'afterTick', event);

  // Show useful warnings if needed (simplified for worklet context)
  if (runnerValue.frameDeltaHistory.length >= 100) {
    if (
      runnerValue.lastUpdatesDeferred &&
      Math.round(runnerValue.frameDelta / engineDelta) > maxUpdates
    ) {
      Common.warnOnce(
        'Matter.Runner: runner reached runner.maxUpdates, see docs.'
      );
    } else if (runnerValue.lastUpdatesDeferred) {
      Common.warnOnce(
        'Matter.Runner: runner reached runner.maxFrameTime, see docs.'
      );
    }
  }
};

interface RunnerProps {
  engineId: string;
  options?: RunnerOptions;
}

/**
 * React Native Reanimated Runner Component for Matter.js.
 * This component manages the Matter.js engine updates on the UI thread using useFrameCallback.
 *
 * @param {object} props - Component props.
 * @param {string} props.engineId - The ID of the Matter.js engine instance in the global scope.
 * @param {RunnerOptions} [props.options] - Optional runner configuration options.
 */
export const Runner: FC<RunnerProps> = ({ engineId, options }) => {
  // Create a shared value for the runner state, accessible on the UI thread
  const runner: SharedValue<RunnerState> = useSharedValue({
    delta: 1000 / 60,
    frameDelta: null,
    frameDeltaSmoothing: true,
    frameDeltaSnapping: true,
    frameDeltaHistory: [],
    frameDeltaHistorySize: 100,
    frameRequestId: null,
    timeBuffer: 0,
    timeLastTick: null,
    maxUpdates: null,
    maxFrameTime: 1000 / 30,
    lastUpdatesDeferred: 0,
    enabled: true,
    fps: 0, // for temporary back compatibility only
    ...options, // Apply any provided options
  } as RunnerState);

  // Shared value to track if the runner has been initialized
  const isRunnerInitialized = useSharedValue(false);

  // Use useFrameCallback to drive the Matter.js engine updates
  useFrameCallback((frameInfo) => {
    'worklet';
    global.gc && global.gc();
    // The frameInfo.timestamp is the current time in milliseconds
    const time = Date.now();

    // Initialize the runner on the first frame callback if not already initialized
    if (!isRunnerInitialized.value) {
      runner.value.timeBuffer = 1000 / 60; // Runner._frameDeltaFallback
      isRunnerInitialized.value = true;
    }

    // Check if the runner is enabled before ticking
    if (runner.value.enabled) {
      // Pass runner.value and engineId to the worklet function
      tickWorklet(runner.value, engineId, time);
    }
  });

  // The Runner component itself doesn't render anything visible
  return null;
};
