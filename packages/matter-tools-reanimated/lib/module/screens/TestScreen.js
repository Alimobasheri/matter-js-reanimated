import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { runOnUI } from 'react-native-reanimated';
import { Demo } from '../components/Demo';
import { initBouncingBalls } from '../examples/BouncingBalls';
export default function TestScreen() {
  const {
    width,
    height
  } = useWindowDimensions();
  React.useEffect(() => {
    // Initialize Matter.js on the UI thread
    runOnUI(() => {
      'worklet';

      if (!global.Matter) return;

      // Make dimensions available to worklets
      global.windowWidth = width;
      global.windowHeight = height;
      global.demoes.bouncingBallsDemo = initBouncingBalls;
    })();
  }, [width, height]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Demo, {
    example: "bouncingBallsDemo",
    options: {
      render: {
        wireframes: true,
        showBounds: true,
        showPositions: true
      },
      touch: {
        constraint: {
          stiffness: 0.2,
          damping: 0.3
        }
      }
    }
  }));
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
//# sourceMappingURL=TestScreen.js.map