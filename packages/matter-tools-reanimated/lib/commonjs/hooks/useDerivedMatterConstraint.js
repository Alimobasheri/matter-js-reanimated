"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDerivedMatterConstraint = useDerivedMatterConstraint;
var _reactNativeReanimated = require("react-native-reanimated");
var _react = require("react");
function useDerivedMatterConstraint(identifier, engineId, process) {
  const sharedValue = (0, _reactNativeReanimated.useSharedValue)(null);
  const frameCallback = (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    if (!global.MatterReanimated || !(engineId in global.MatterReanimated)) return;
    const engine = global.MatterReanimated[engineId];
    if (!engine || !engine.world) return;
    const {
      Matter
    } = global;
    let constraint;
    if ('id' in identifier) {
      constraint = Matter.Composite.get(engine.world, identifier.id, 'constraint');
    } else {
      const constraints = Matter.Composite.allConstraints(engine.world);
      constraint = constraints.find(c => c.label === identifier.label);
    }
    if (constraint) {
      sharedValue.value = process(constraint);
    }
  }, true);
  (0, _react.useEffect)(() => {
    return () => frameCallback.setActive(false);
  }, []);
  return sharedValue;
}
//# sourceMappingURL=useDerivedMatterConstraint.js.map