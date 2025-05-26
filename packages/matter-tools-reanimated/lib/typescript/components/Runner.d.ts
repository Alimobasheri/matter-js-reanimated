import { FC } from 'react';
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
export declare const Runner: FC<RunnerProps>;
export {};
//# sourceMappingURL=Runner.d.ts.map