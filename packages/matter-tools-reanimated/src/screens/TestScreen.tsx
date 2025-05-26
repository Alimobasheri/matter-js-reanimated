import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { runOnUI } from 'react-native-reanimated';
import { Demo } from '../components/Demo';
import { initBouncingBalls } from '../examples/BouncingBalls';
import { initAvalanche } from '../examples/avalanche';
import { initBallPool } from '../examples/ballPool';
import { initConstraints } from '../examples/constraints';
import { initCloth } from '../examples/cloth';

export default function TestScreen() {
  const { width, height } = useWindowDimensions();

  React.useEffect(() => {
    // Make dimensions available to worklets
    runOnUI(() => {
      'worklet';
      global.windowWidth = width;
      global.windowHeight = height;
    })();
  }, [width, height]);

  return (
    <View style={styles.container}>
      <Demo
        exampleWorklet={initCloth}
        options={{
          render: {
            wireframes: false,
            showConstraints: true,
          },
          touch: {
            constraint: {
              stiffness: 0.2,
              damping: 0.3,
            },
            enablePan: true,
          },
          skia: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
