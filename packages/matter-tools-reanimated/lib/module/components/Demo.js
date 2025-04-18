import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFrameCallback, runOnUI } from 'react-native-reanimated';
import { withMatter } from '../hoc/withMatter';
import { Render } from './Render';
// import { Touch } from './Touch';

const DemoComponent = ({
  example,
  options = {}
}) => {
  React.useEffect(() => {
    runOnUI(() => {
      'worklet';

      if (!global.Matter) {
        console.warn('Matter.js not initialized! Run initMatter() first.');
        return;
      }
      const engine = global.Matter.Engine.create({
        enableSleeping: false,
        gravity: {
          x: 0,
          y: 1,
          scale: 0.001
        }
      });
      global.demoEngine = engine;
      if (example in global) {
        global.demoes[example]?.(engine);
      }
      console.log(`Demo example "${example}" initialized".`);
    })();
    return () => {
      runOnUI(() => {
        'worklet';

        if (global.demoEngine) {
          global.Matter.Composite.clear(global.demoEngine.world, false, true);
          global.demoEngine = undefined;
        }
      })();
    };
  }, [example]);
  useFrameCallback(() => {
    'worklet';

    if (!global.demoEngine) return;
    global.Matter.Engine.update(global.demoEngine, 16.667 // Use fixed timestep for demos
    );
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Render, {
    engineId: "demoEngine",
    options: options.render
  }));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
export const Demo = withMatter(DemoComponent);
//# sourceMappingURL=Demo.js.map