import React from 'react';
//@ts-ignore
import { Path, Circle, G } from 'react-native-svg';
import Animated, { useAnimatedProps, useFrameCallback, useSharedValue } from 'react-native-reanimated';
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);
export const RenderBody = ({
  bodies,
  options = {}
}) => {
  const pathD = useSharedValue('');
  useFrameCallback(() => {
    'worklet';

    let completePath = '';
    for (let i = 0; i < bodies.value.length; i++) {
      const body = bodies.value[i];
      if (body.type === 'circle' && body.circleRadius !== undefined) {
        const x = body.position.x;
        const y = body.position.y;
        const r = body.circleRadius;
        completePath += `M ${x - r},${y} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0 `;
      } else {
        completePath += body.vertices.map((v, j) => `${j === 0 ? 'M' : 'L'} ${v.x} ${v.y}`).join(' ') + 'Z ';
      }
    }
    pathD.value = completePath;
  });
  const animatedProps = useAnimatedProps(() => {
    return {
      d: pathD.value,
      fill: options.wireframes ? 'none' : 'black',
      stroke: options.wireframes ? '#2E3440' : 'none',
      strokeWidth: 1
    };
  }, [pathD, options.wireframes]);
  return /*#__PURE__*/React.createElement(AnimatedG, null, /*#__PURE__*/React.createElement(AnimatedPath, {
    animatedProps: animatedProps
  }));
};
//# sourceMappingURL=RenderBody.js.map