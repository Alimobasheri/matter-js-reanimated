"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiaConstraints = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSkia = require("@shopify/react-native-skia");
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SkiaConstraints = ({
  options = {}
}) => {
  const {
    width: windowWidth,
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const width = options.width || windowWidth;
  const height = options.height || windowHeight;
  const image = (0, _reactNativeReanimated.useSharedValue)(null);
  const drawConstraints = imgRef => {
    'worklet';

    const surface = _reactNativeSkia.Skia.Surface.MakeOffscreen(width, height);
    if (!surface) return;
    const canvas = surface.getCanvas();
    canvas.clear(_reactNativeSkia.Skia.Color('transparent'));
    if (!Array.isArray(global.svgConstraints)) {
      imgRef.value = surface.makeImageSnapshot();
      return;
    }
    const strokePaint = _reactNativeSkia.Skia.Paint();
    strokePaint.setStyle(_reactNativeSkia.PaintStyle.Stroke);
    strokePaint.setAntiAlias(true);
    strokePaint.setStrokeWidth(1);
    strokePaint.setColor(_reactNativeSkia.Skia.Color(options.wireframes ? '#2E3440' : '#bbbbbb'));
    const anchorPaint = _reactNativeSkia.Skia.Paint();
    anchorPaint.setStyle(_reactNativeSkia.PaintStyle.Stroke);
    anchorPaint.setAntiAlias(true);
    anchorPaint.setStrokeWidth(1);
    anchorPaint.setColor(_reactNativeSkia.Skia.Color('#bbbbbb'));
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
        const pinPath = _reactNativeSkia.Skia.Path.Make();
        pinPath.addCircle(startX, startY, 3);
        canvas.drawPath(pinPath, strokePaint);
      } else {
        const springPath = _reactNativeSkia.Skia.Path.Make();
        springPath.moveTo(startX, startY);
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
              springPath.lineTo(x, y);
            }
          }
        }
        springPath.lineTo(endX, endY);
        canvas.drawPath(springPath, strokePaint);
      }
      if (constraint.render.anchors) {
        const anchorA = _reactNativeSkia.Skia.Path.Make();
        anchorA.addCircle(startX, startY, 3);
        const anchorB = _reactNativeSkia.Skia.Path.Make();
        anchorB.addCircle(endX, endY, 3);
        canvas.drawPath(anchorA, anchorPaint);
        canvas.drawPath(anchorB, anchorPaint);
      }
    }
    surface.flush();
    imgRef.value = surface.makeImageSnapshot();
  };
  (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    drawConstraints(image);
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Image, {
    image: image,
    x: 0,
    y: 0,
    width: width,
    height: height
  });
};
exports.SkiaConstraints = SkiaConstraints;
//# sourceMappingURL=SkiaConstraints.js.map