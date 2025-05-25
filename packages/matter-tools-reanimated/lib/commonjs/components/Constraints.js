"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constraints = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = require("react-native-svg");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//@ts-ignore

const AnimatedPath = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Path);
const AnimatedG = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.G);
const Constraints = ({
  options = {}
}) => {
  const constraintPathD = (0, _reactNativeReanimated.useSharedValue)('');
  (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    let constraintPath = '';
    if (Array.isArray(global.svgConstraints)) {
      for (const constraint of global.svgConstraints) {
        if (!constraint.render.visible) continue;
        let startX = constraint.pointA.x;
        let startY = constraint.pointA.y;
        let endX = constraint.pointB.x;
        let endY = constraint.pointB.y;
        if (constraint.bodyAId) {
          const bodyA = global.svgContent.find(b => b.id === constraint.bodyAId);
          if (bodyA) {
            startX = bodyA.position.x + constraint.pointA.x;
            startY = bodyA.position.y + constraint.pointA.y;
          }
        }
        if (constraint.bodyBId) {
          const bodyB = global.svgContent.find(b => b.id === constraint.bodyBId);
          if (bodyB) {
            endX = bodyB.position.x + constraint.pointB.x;
            endY = bodyB.position.y + constraint.pointB.y;
          }
        }
        if (constraint.type === 'pin') {
          constraintPath += `M ${startX - 3},${startY} a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;
        } else {
          constraintPath += `M ${startX},${startY} L ${endX},${endY} `;
          if (constraint.type === 'spring') {
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const length = Math.hypot(deltaX, deltaY);
            if (length > 0) {
              const normal = {
                x: -deltaY / length,
                y: deltaX / length
              };
              const coils = Math.ceil(Math.min(Math.max(length / 5, 12), 20));
              for (let j = 1; j < coils; j++) {
                const t = j / coils;
                const offset = j % 2 === 0 ? 1 : -1;
                const x = startX + deltaX * t + normal.x * offset * 4;
                const y = startY + deltaY * t + normal.y * offset * 4;
                constraintPath += `L ${x},${y} `;
              }
            }
            constraintPath += `L ${endX},${endY} `;
          }
        }
        if (constraint.render.anchors) {
          constraintPath += `M ${startX - 3},${startY} a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;
          constraintPath += `M ${endX - 3},${endY} a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;
        }
      }
    }
    constraintPathD.value = constraintPath;
  });
  const constraintAnimatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    d: constraintPathD.value,
    fill: 'none',
    stroke: options.wireframes ? '#2E3440' : '#bbb',
    strokeWidth: 1
  }), [constraintPathD, options.wireframes]);
  return /*#__PURE__*/_react.default.createElement(AnimatedG, null, /*#__PURE__*/_react.default.createElement(AnimatedPath, {
    animatedProps: constraintAnimatedProps
  }));
};
exports.Constraints = Constraints;
//# sourceMappingURL=Constraints.js.map