"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Render = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNativeSvg = _interopRequireDefault(require("react-native-svg"));
var _RenderBody = require("./RenderBody");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//@ts-ignore

const Render = ({
  engineId = 'physicsEngine',
  options = {}
}) => {
  const {
    width: windowWidth,
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const width = options.width || windowWidth;
  const height = options.height || windowHeight;

  // Single worklet to generate all SVG content
  const svgContent = (0, _reactNativeReanimated.useSharedValue)([]);
  (0, _reactNativeReanimated.useFrameCallback)(() => {
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      width,
      height
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    width: width,
    height: height,
    style: [styles.svg, {
      backgroundColor: options.background || 'yellow'
    }]
  }, /*#__PURE__*/_react.default.createElement(_RenderBody.RenderBody, {
    bodies: svgContent,
    options: options
  })));
};
exports.Render = Render;
const styles = _reactNative.StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  svg: {
    flex: 1
  }
});
//# sourceMappingURL=Render.js.map