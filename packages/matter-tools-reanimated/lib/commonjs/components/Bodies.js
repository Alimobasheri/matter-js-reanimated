"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bodies = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = require("react-native-svg");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//@ts-ignore

const AnimatedPath = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Path);
const AnimatedG = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.G);
const Bodies = ({
  options = {}
}) => {
  const pathsData = (0, _reactNativeReanimated.useSharedValue)({});
  (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    if (!Array.isArray(global.svgContent)) return;
    const newPaths = {};
    for (const body of global.svgContent) {
      if (body.render?.visible === false) {
        continue;
      }
      const pathD = body.type === 'circle' && body.circleRadius !== undefined ? `M ${body.position.x - body.circleRadius},${body.position.y} ` + `a ${body.circleRadius},${body.circleRadius} 0 1,0 ${body.circleRadius * 2},0 ` + `a ${body.circleRadius},${body.circleRadius} 0 1,0 -${body.circleRadius * 2},0` : body.vertices.map((v, j) => `${j === 0 ? 'M' : 'L'} ${v.x} ${v.y}`).join(' ') + 'Z';
      newPaths[body.id] = {
        d: pathD,
        fill: options.wireframes ? 'none' : body.render?.fillStyle || '#000000',
        stroke: options.wireframes ? body.render?.strokeStyle || '#2E3440' : body.render?.strokeStyle || 'none',
        strokeWidth: options.wireframes ? body.render?.lineWidth || 1 : 0
      };
    }
    pathsData.value = newPaths;
  }, true);
  const animatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    'worklet';

    const paths = Object.values(pathsData.value);
    return {
      d: paths.map(p => p.d).join(' '),
      fill: paths[0]?.fill || 'none',
      stroke: paths[0]?.stroke || 'none',
      strokeWidth: paths[0]?.strokeWidth || 0
    };
  });
  return /*#__PURE__*/_react.default.createElement(AnimatedPath, {
    animatedProps: animatedProps
  });
};
exports.Bodies = Bodies;
//# sourceMappingURL=Bodies.js.map