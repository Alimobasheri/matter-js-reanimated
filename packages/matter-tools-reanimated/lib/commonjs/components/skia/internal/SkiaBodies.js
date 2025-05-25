"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiaBodies = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSkia = require("@shopify/react-native-skia");
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SkiaBodies = ({
  options = {}
}) => {
  const {
    width: windowWidth,
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const width = options.width || windowWidth;
  const height = options.height || windowHeight;
  const image = (0, _reactNativeReanimated.useSharedValue)(null);
  const drawScene = imgRef => {
    'worklet';

    const surface = _reactNativeSkia.Skia.Surface.MakeOffscreen(width, height);
    if (!surface) return;
    const canvas = surface.getCanvas();
    canvas.clear(_reactNativeSkia.Skia.Color(options.background || 'white'));
    if (!Array.isArray(global.svgContent)) {
      imgRef.value = surface.makeImageSnapshot();
      return;
    }
    for (const body of global.svgContent) {
      const skPath = _reactNativeSkia.Skia.Path.Make();
      if (body.type === 'circle' && body.circleRadius !== undefined) {
        skPath.addCircle(body.position.x, body.position.y, body.circleRadius);
      } else {
        const verts = body.vertices;
        if (verts.length > 0) {
          skPath.moveTo(verts[0].x, verts[0].y);
          for (let j = 1; j < verts.length; j++) {
            skPath.lineTo(verts[j].x, verts[j].y);
          }
          skPath.close();
        }
      }
      const fillPaint = _reactNativeSkia.Skia.Paint();
      fillPaint.setAntiAlias(true);
      fillPaint.setStyle(_reactNativeSkia.PaintStyle.Fill);
      fillPaint.setColor(_reactNativeSkia.Skia.Color(options.wireframes ? 'transparent' : body.render?.fillStyle || '#000000'));
      canvas.drawPath(skPath, fillPaint);

      // Optional stroke
      if (options.wireframes || body.render?.strokeStyle) {
        const strokePaint = _reactNativeSkia.Skia.Paint();
        strokePaint.setStyle(_reactNativeSkia.PaintStyle.Stroke);
        strokePaint.setStrokeWidth(body.render?.lineWidth || 1);
        strokePaint.setColor(_reactNativeSkia.Skia.Color(body.render?.strokeStyle || '#2E3440'));
        canvas.drawPath(skPath, strokePaint);
      }
    }
    surface.flush();
    imgRef.value = surface.makeImageSnapshot();
  };
  (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    drawScene(image);
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Image, {
    image: image,
    x: 0,
    y: 0,
    width: width,
    height: height
  });
};
exports.SkiaBodies = SkiaBodies;
//# sourceMappingURL=SkiaBodies.js.map