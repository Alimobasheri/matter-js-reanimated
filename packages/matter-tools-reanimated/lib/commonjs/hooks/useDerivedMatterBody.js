"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDerivedMatterBody = useDerivedMatterBody;
var _reactNativeReanimated = require("react-native-reanimated");
var _react = require("react");
function useDerivedMatterBody(identifier, engineId, process) {
  const sharedValue = (0, _reactNativeReanimated.useSharedValue)(null);
  const frameCallback = (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    if (!global.Matter || !(engineId in global)) return;
    const engine = global[engineId];
    if (!engine || !engine.world) return;
    const {
      Matter
    } = global;
    let body;
    if ('id' in identifier) {
      body = Matter.Composite.get(engine.world, identifier.id, 'body');
    } else {
      const bodies = Matter.Composite.allBodies(engine.world);
      body = bodies.find(b => b.label === identifier.label);
    }
    if (body) {
      sharedValue.value = process(body);
    }
  }, true);
  (0, _react.useEffect)(() => {
    return () => frameCallback.setActive(false);
  }, []);
  return sharedValue;
}
//# sourceMappingURL=useDerivedMatterBody.js.map