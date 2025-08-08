import React, { useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Demo } from '../components/Demo';
import { initCloth } from '../examples/cloth';

export default function TestScreen() {
  const { width, height } = useWindowDimensions();

  const exampleWorklet = useCallback((engine: Matter.Engine) => {
    'worklet';
    global.windowWidth = width;
    global.windowHeight = height;
    initCloth(engine);
  }, []);

  return (
    <View style={styles.container}>
      <Demo
        exampleWorklet={exampleWorklet}
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
          skia: true,
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
