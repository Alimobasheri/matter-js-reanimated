"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiaConstraints = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSkia = require("@shopify/react-native-skia");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SkiaConstraints = ({
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
      if (!global.MatterReanimated || !(engineId in global)) return;
      const engine = global[engineId];
      if (!engine || !engine.world) return;
      const _ = frameTick.value; // Access the shared value to trigger re-render

      const constraints = global.MatterReanimated.Composite.allConstraints(engine.world);
      const bodies = global.MatterReanimated.Composite.allBodies(engine.world);
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
      for (const constraint of constraints) {
        if (constraint.render?.visible === false) continue;
        let startX = constraint.pointA.x;
        let startY = constraint.pointA.y;
        let endX = constraint.pointB.x;
        let endY = constraint.pointB.y;
        if (constraint.bodyA?.id) {
          const bodyA = bodies.find(b => b.id === constraint.bodyA?.id);
          if (bodyA) {
            startX = bodyA.position.x + constraint.pointA.x;
            startY = bodyA.position.y + constraint.pointA.y;
          }
        }
        if (constraint.bodyB?.id) {
          const bodyB = bodies.find(b => b.id === constraint.bodyB?.id);
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
        if (constraint.render?.anchors) {
          const anchorA = _reactNativeSkia.Skia.Path.Make();
          anchorA.addCircle(startX, startY, 3);
          const anchorB = _reactNativeSkia.Skia.Path.Make();
          anchorB.addCircle(endX, endY, 3);
          canvas.drawPath(anchorA, anchorPaint);
          canvas.drawPath(anchorB, anchorPaint);
        }
      }
    });
  }, [frameTick]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Picture, {
    picture: picture
  });
};
exports.SkiaConstraints = SkiaConstraints;
//# sourceMappingURL=SkiaConstraints.js.map