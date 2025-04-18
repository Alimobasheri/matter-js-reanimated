"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderBody = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = require("react-native-svg");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//@ts-ignore

const AnimatedPath = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Path);
const AnimatedCircle = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Circle);
const AnimatedG = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.G);
const RenderBody = ({
  bodies,
  options = {}
}) => {
  const pathD = (0, _reactNativeReanimated.useSharedValue)('');
  (0, _reactNativeReanimated.useFrameCallback)(() => {
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
  const animatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    return {
      d: pathD.value,
      fill: options.wireframes ? 'none' : 'black',
      stroke: options.wireframes ? '#2E3440' : 'none',
      strokeWidth: 1
    };
  }, [pathD, options.wireframes]);
  return /*#__PURE__*/_react.default.createElement(AnimatedG, null, /*#__PURE__*/_react.default.createElement(AnimatedPath, {
    animatedProps: animatedProps
  }));
};
exports.RenderBody = RenderBody;
//# sourceMappingURL=RenderBody.js.map