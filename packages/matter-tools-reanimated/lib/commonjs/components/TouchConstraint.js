"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchConstraint = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = require("react-native-reanimated");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * A component that adds a touch constraint to the engine.
 *
 * When the user touches the screen, it will try to find a body to drag.
 * The body is found by checking if the touch point is inside the body's bounds.
 * If the body is found, it will be assigned to the constraint and the constraint
 * will be updated to follow the user's touch.
 *
 * The touch constraint is created with a stiffness of 0.1 and a length of 0.01.
 * These values can be changed by passing an options object with the constraint
 * properties.
 *
 * The component uses the `GestureDetector` from `react-native-gesture-handler`
 * to handle the gesture events.
 *
 * @param {Object} props The props object.
 * @param {string} [props.engineId='defaultEngine'] The ID of the engine.
 * @param {Object} [props.options={}] The options object.
 * @param {Object} [props.options.constraint={}] The constraint properties.
 * @param {number} [props.options.constraint.stiffness=0.1] The stiffness of the constraint.
 * @param {number} [props.options.constraint.length=0.01] The length of the constraint.
 * @param {boolean} [props.enabled=true] Whether the constraint is enabled.
 * @param {React.ReactNode} props.children The children of the component.
 *
 * @return {JSX.Element} The component.
 */
const TouchConstraint = ({
  engineId = 'defaultEngine',
  options = {},
  enabled = true,
  children
}) => {
  _react.default.useEffect(() => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (!global.Matter || !(engineId in global)) return;
      const engine = global[engineId];
      if (!global.Matter.touchConstraint) {
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
        global.Matter.touchConstraint = {
          type: 'touchConstraint',
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

        if (global.Matter.touchConstraint) {
          const engine = global[engineId];
          global.Matter.World.remove(engine.world, global.Matter.touchConstraint.constraint);
          global.Matter.touchConstraint = null;
        }
      })();
    };
  }, [engineId, options.constraint]);
  const pan = _reactNativeGestureHandler.Gesture.Pan().enabled(enabled).onBegin(event => {
    'worklet';

    if (!global.Matter || !(engineId in global) || !global.Matter.touchConstraint) return;
    const engine = global[engineId];
    const point = {
      x: event.x,
      y: event.y
    };
    const bodies = global.Matter.Composite.allBodies(engine.world);
    const touchConstraint = global.Matter.touchConstraint;
    const constraint = touchConstraint.constraint;

    // Reset previous body
    constraint.bodyB = touchConstraint.body = null;
    constraint.pointB = global.Matter.Vector.create(0, 0);

    // Find new body to drag
    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      if (global.Matter.Bounds.contains(body.bounds, point) && global.Matter.Detector.canCollide(body.collisionFilter, touchConstraint.collisionFilter)) {
        // Check parts (for compound bodies)
        for (let j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
          const part = body.parts[j];
          if (global.Matter.Vertices.contains(part.vertices, point)) {
            constraint.pointA = point;
            constraint.bodyB = touchConstraint.body = body;
            constraint.pointB = {
              x: point.x - body.position.x,
              y: point.y - body.position.y
            };
            //@ts-ignore
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

    if (!global.Matter || !global.Matter.touchConstraint) return;
    const constraint = global.Matter.touchConstraint.constraint;
    const body = constraint.bodyB;
    if (body) {
      constraint.pointA = {
        x: event.x,
        y: event.y
      };
      global.Matter.Sleeping.set(body, false);
    }
  }).onEnd(() => {
    'worklet';

    if (!global.Matter || !global.Matter.touchConstraint) return;
    const touchConstraint = global.Matter.touchConstraint;
    const constraint = touchConstraint.constraint;
    const body = constraint.bodyB;
    if (body) {
      // Clear all references to the body
      constraint.bodyB = null;
      touchConstraint.body = null;

      // Reset the constraint points
      constraint.pointA = {
        x: 0,
        y: 0
      };
      constraint.pointB = {
        x: 0,
        y: 0
      };
    }
  });
  const gesture = _reactNativeGestureHandler.Gesture.Simultaneous(pan);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: gesture
  }, children));
};
exports.TouchConstraint = TouchConstraint;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=TouchConstraint.js.map