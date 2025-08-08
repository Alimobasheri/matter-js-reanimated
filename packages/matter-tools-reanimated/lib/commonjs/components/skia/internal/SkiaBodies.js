"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiaBodies = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSkia = require("@shopify/react-native-skia");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SkiaBodies = ({
  engineId = 'defaultEngine',
  options = {}
}) => {
  const {
    width: windowWidth,
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const canvasWidth = options.width || windowWidth;
  const canvasHeight = options.height || windowHeight;

  // Shared values to trigger re-render
  const frameTick = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    let now = Date.now();
    // console.log(now - frameTick.value, 'ms since last frame');
    frameTick.value = now;
  });
  const picture = (0, _reactNativeReanimated.useDerivedValue)(() => {
    return (0, _reactNativeSkia.createPicture)(canvas => {
      if (!global.MatterReanimated || !(engineId in global.MatterReanimated)) return;
      const engine = global.MatterReanimated[engineId];
      if (!engine || !engine.world) return;
      const _ = frameTick.value;
      const bodies = global.MatterReanimated.Composite.allBodies(engine.world);
      canvas.clear(_reactNativeSkia.Skia.Color(options.background || 'white'));
      for (const body of bodies) {
        if (body.render?.visible === false) continue;
        const skPath = _reactNativeSkia.Skia.Path.Make();
        if (body.type === 'circle' && body.circleRadius !== undefined) {
          skPath.addCircle(body.position.x, body.position.y, body.circleRadius);
        } else {
          const verts = body.vertices;
          if (verts && verts.length > 0) {
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
        if (options.wireframes || body.render?.strokeStyle) {
          const strokePaint = _reactNativeSkia.Skia.Paint();
          strokePaint.setStyle(_reactNativeSkia.PaintStyle.Stroke);
          strokePaint.setStrokeWidth(body.render?.lineWidth || 1);
          strokePaint.setColor(_reactNativeSkia.Skia.Color(body.render?.strokeStyle || '#2E3440'));
          canvas.drawPath(skPath, strokePaint);
        }
      }
    });
  }, [frameTick]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Picture, {
    picture: picture
  });
};
exports.SkiaBodies = SkiaBodies;
//# sourceMappingURL=SkiaBodies.js.map