import Matter from 'matter-js-reanimated';
import initMatter from 'matter-js-reanimated';
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
    if (!global.Matter) {
      //@ts-ignore
      initMatter();
    }
    let engine: Matter.Engine | undefined;
    if (engineId in global && global.Matter) {
      //@ts-ignore
      engine = global[engineId] as Matter.Engine;
      global.Matter.Composite.clear(engine.world, false, true);
    }
    if (!global.Matter) {
      console.warn('Matter.js not initialized! Run initMatter() first.');
      return;
    }

    engine = global.Matter.Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 1, scale: 0.001 },
    });

    //@ts-ignore
    global[engineId] = engine;
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
