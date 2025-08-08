import { useFrameCallback } from 'react-native-reanimated';
import { initAniamtedDemo } from '../examples/animatedDemo';
import { useInitWorklet } from '../hooks/useInitWorklet';
import { Sign } from './components/Sign';

export const CustomScreen = () => {
  const initialized = useInitWorklet(initAniamtedDemo, 'demoEngine');
  useFrameCallback(() => {
    'worklet';
    if (!global.demoEngine) return;

    global.MatterReanimated.Engine.update(
      global.demoEngine,
      16.667 // Use fixed timestep for demos
    );
  });
  return initialized ? <Sign /> : null;
};
