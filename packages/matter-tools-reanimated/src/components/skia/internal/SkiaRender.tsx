import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useFrameCallback } from 'react-native-reanimated';
import Matter from 'matter-js';
import { Canvas } from '@shopify/react-native-skia';
import { SkiaBodies } from './SkiaBodies';
import { SkiaConstraints } from './SkiaConstraints';
import { Runner } from '../../Runner';

export interface RenderProps {
  engineId?: string;
  options?: {
    width?: number;
    height?: number;
    background?: string;
    wireframes?: boolean;
    showConstraints?: boolean;
    showBounds?: boolean;
    showAxes?: boolean;
    showPositions?: boolean;
    showAngleIndicator?: boolean;
  };
}

export const SkiaRender: React.FC<RenderProps> = ({
  engineId = 'physicsEngine',
  options = {},
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const width = options.width || windowWidth;
  const height = options.height || windowHeight;

  return (
    <View style={[styles.container, { width, height }]}>
      <Canvas
        style={[
          styles.svg,
          {
            backgroundColor: options.background || 'transparent',
            width,
            height,
          },
        ]}
      >
        <Runner engineId="demoEngine" options={{ enabled: true }} />

        <SkiaBodies options={options} engineId={engineId} />
        {options.showConstraints && (
          <SkiaConstraints options={options} engineId={engineId} />
        )}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  svg: {
    flex: 1,
  },
});
