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
          pointA: {
            x: 0,
            y: 0
          },
          pointB: {
            x: 0,
            y: 0
          },
          length: 0.01,
          stiffness: options.constraint?.stiffness ?? 0.1,
          label: 'Mouse Constraint'
        });
        global.mouseConstraint = {
          type: 'mouseConstraint',
          constraint: constraint,
          body: null,
          collisionFilter: {
            category: 0x0001,
            mask: 0xffffffff,
            group: 0
          }
        };
        global.Matter.World.add(engine.world, constraint);
      }
    })();
    return () => {
      (0, _reactNativeReanimated.runOnUI)(() => {
        'worklet';

        if (global.mouseConstraint) {
          const engine = global[engineId];
          global.Matter.World.remove(engine.world, global.mouseConstraint.constraint);
          global.mouseConstraint = null;
        }
      })();
    };
  }, [engineId, options.constraint]);
  const pan = _reactNativeGestureHandler.Gesture.Pan().enabled(options.enablePan ?? true).onBegin(event => {
    'worklet';

    if (!global.Matter || !(engineId in global) || !global.mouseConstraint) return;
    const engine = global[engineId];
    const point = {
      x: event.absoluteX,
      y: event.absoluteY
    };
    const bodies = global.Matter.Composite.allBodies(engine.world);
    const mouseConstraint = global.mouseConstraint;
    const constraint = mouseConstraint.constraint;

    // Reset previous body
    constraint.bodyB = mouseConstraint.body = null;
    constraint.pointB = null;

    // Find new body to drag
    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      if (global.Matter.Bounds.contains(body.bounds, point) && global.Matter.Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
        // Check parts (for compound bodies)
        for (let j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
          const part = body.parts[j];
          if (global.Matter.Vertices.contains(part.vertices, point)) {
            constraint.pointA = point;
            constraint.bodyB = mouseConstraint.body = body;
            constraint.pointB = {
              x: point.x - body.position.x,
              y: point.y - body.position.y
            };
            constraint.angleB = body.angle;
            global.Matter.Sleeping.set(body, false);
            break;
          }
        }
        if (constraint.bodyB) break;
      }
    }
  }).onUpdate(event => {
    'worklet';

    if (!global.mouseConstraint) return;
    const constraint = global.mouseConstraint.constraint;
    const body = constraint.bodyB;
    if (body) {
      constraint.pointA = {
        x: event.absoluteX,
        y: event.absoluteY
      };
      global.Matter.Sleeping.set(body, false);
    }
  }).onEnd(() => {
    'worklet';

    if (!global.mouseConstraint) return;
    const constraint = global.mouseConstraint.constraint;
    const body = constraint.bodyB;
    if (body) {
      constraint.bodyB = global.mouseConstraint.body = null;
      constraint.pointB = null;
    }
  });
  const gesture = _reactNativeGestureHandler.Gesture.Simultaneous(pan);
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