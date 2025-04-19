"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Touch = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = require("react-native-reanimated");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Touch = ({
  engineId = 'physicsEngine',
  options = {},
  children
}) => {
  _react.default.useEffect(() => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (!global.Matter || !(engineId in global)) return;
      const engine = global[engineId];
      if (!global.mouseConstraint) {
        const constraint = global.Matter.Constraint.create({
          stiffness: options.constraint?.stiffness ?? 0.2,
          damping: options.constraint?.damping ?? 0.3,
          length: 0,
          label: 'Mouse Constraint'
        });
        global.mouseConstraint = constraint;
        global.Matter.World.add(engine.world, constraint);
      }
    })();
    return () => {
      (0, _reactNativeReanimated.runOnUI)(() => {
        'worklet';

        if (global.mouseConstraint) {
          const engine = global[engineId];
          global.Matter.World.remove(engine.world, global.mouseConstraint);
          global.mouseConstraint = null;
        }
      })();
    };
  }, [engineId, options.constraint]);
  const pan = _reactNativeGestureHandler.Gesture.Pan().enabled(options.enablePan ?? true).onBegin(event => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (!global.Matter || !(engineId in global) || !global.mouseConstraint) return;
      const point = {
        x: event.absoluteX,
        y: event.absoluteY
      };
      const engine = global[engineId];
      const bodies = global.Matter.Query.point(engine.world.bodies, point);
      if (bodies.length > 0) {
        const body = bodies[0];
        global.mouseConstraint.bodyB = body;
        global.mouseConstraint.pointA = point;
        global.mouseConstraint.pointB = global.Matter.Vector.sub(point, body.position);
        global.activeDragBody = body;
      }
    })();
  }).onUpdate(event => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (!global.mouseConstraint?.bodyB) return;
      global.mouseConstraint.pointA = {
        x: event.absoluteX,
        y: event.absoluteY
      };
    })();
  }).onFinalize(() => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (!global.mouseConstraint) return;
      global.mouseConstraint.bodyB = null;
      global.activeDragBody = null;
    })();
  });
  const pinch = _reactNativeGestureHandler.Gesture.Pinch().enabled(options.enablePinch ?? true).onUpdate(event => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (!global.activeDragBody) return;
      global.Matter.Body.scale(global.activeDragBody, event.scale, event.scale);
    })();
  });
  const rotate = _reactNativeGestureHandler.Gesture.Rotation().enabled(options.enableRotate ?? true).onUpdate(event => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (!global.activeDragBody) return;
      global.Matter.Body.rotate(global.activeDragBody, event.rotation);
    })();
  });
  const gesture = _reactNativeGestureHandler.Gesture.Simultaneous(pan, pinch, rotate);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: gesture
  }, children));
};
exports.Touch = Touch;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=Touch.js.map