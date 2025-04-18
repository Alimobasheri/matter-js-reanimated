import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useFrameCallback, useSharedValue } from 'react-native-reanimated';
//@ts-ignore
import Svg from 'react-native-svg';
import { RenderBody } from './RenderBody';
export const Render = ({
  engineId = 'physicsEngine',
  options = {}
}) => {
  const {
    width: windowWidth,
    height: windowHeight
  } = useWindowDimensions();
  const width = options.width || windowWidth;
  const height = options.height || windowHeight;

  // Single worklet to generate all SVG content
  const svgContent = useSharedValue([]);
  useFrameCallback(() => {
    'worklet';

    if (!global.Matter || !(engineId in global)) return [];
    const engine = global[engineId];
    const bodies = engine.world.bodies;

    // Generate SVG elements for each body - this runs in the UI thread
    svgContent.value = bodies.map(body => ({
      id: body.id,
      type: body.circleRadius ? 'circle' : 'polygon',
      position: {
        ...body.position
      },
      angle: body.angle,
      vertices: body.vertices.map(v => ({
        ...v
      })),
      bounds: {
        min: {
          ...body.bounds.min
        },
        max: {
          ...body.bounds.max
        }
      },
      circleRadius: body.circleRadius
    }));
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      width,
      height
    }]
  }, /*#__PURE__*/React.createElement(Svg, {
    width: width,
    height: height,
    style: [styles.svg, {
      backgroundColor: options.background || 'yellow'
    }]
  }, /*#__PURE__*/React.createElement(RenderBody, {
    bodies: svgContent,
    options: options
  })));
};
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  svg: {
    flex: 1
  }
});
//# sourceMappingURL=Render.js.map