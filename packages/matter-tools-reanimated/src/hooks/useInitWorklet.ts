import initMatter, { MatterReanimated } from 'matter-js-reanimated';
import { useCallback, useEffect, useState } from 'react';
import { runOnJS, runOnUI } from 'react-native-reanimated';

export const useInitWorklet = (
  worklet?: (engine: any) => void,
  engineId: string = 'defaultEngine'
) => {
  const [initialized, setInitialized] = useState(false);

  const initUI = useCallback(() => {
    'worklet';
    // Only initialize if not already done
    if (!global.MatterReanimated) {
      initMatter();
    }

    if (!global.MatterToolsReanimated) {
      global.MatterToolsReanimated = {} as any;
    }

    let engine: Matter.Engine | undefined;
    if (engineId in global.MatterToolsReanimated) {
      engine = global.MatterToolsReanimated[engineId];
      if (engine)
        global.MatterReanimated.Composite.clear(engine.world, false, true);
    }
    if (!global.MatterReanimated) {
      console.warn('Matter.js not initialized! Run initMatter() first.');
      return;
    }

    engine = global.MatterReanimated.Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 1, scale: 0.001 },
    });

    global.MatterToolsReanimated[engineId] = engine;
    if (worklet) {
      worklet(engine);
    }
    runOnJS(setInitialized)(true);
  }, [worklet, engineId]);

  useEffect(() => {
    runOnUI(initUI)();
  }, [initUI]);

  return initialized;
};
