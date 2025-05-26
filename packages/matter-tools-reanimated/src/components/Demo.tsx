import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ReanimatedMatter } from './ReanimatedMatter';
import { Render, RenderProps } from './Render';
import { TouchConstraint } from './TouchConstraint';
import { SkiaRender } from './skia/SkiaRender';
import { Runner } from './Runner';
import Matter from 'matter-js';

interface DemoProps {
  exampleWorklet: (engine: any) => void;
  options?: {
    render?: RenderProps['options'];
    touch?: {
      constraint?: Matter.IConstraintDefinition;
      enablePan?: boolean;
    };
    skia?: boolean;
  };
}

export const Demo: React.FC<DemoProps> = ({ exampleWorklet, options = {} }) => {
  return (
    <View style={styles.container}>
      <ReanimatedMatter worklet={exampleWorklet} engineId="demoEngine">
        <Runner engineId="demoEngine" options={{ enabled: true }} />
        <TouchConstraint engineId="demoEngine" options={options.touch}>
          {options.skia ? (
            <SkiaRender engineId="demoEngine" options={options.render} />
          ) : (
            <Render engineId="demoEngine" options={options.render} />
          )}
        </TouchConstraint>
      </ReanimatedMatter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
