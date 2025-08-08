"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInitWorklet = void 0;
var _matterJsReanimated = _interopRequireDefault(require("matter-js-reanimated"));
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useInitWorklet = (worklet, engineId = 'defaultEngine') => {
  const [initialized, setInitialized] = (0, _react.useState)(false);
  const initUI = (0, _react.useCallback)(() => {
    'worklet';

    // Only initialize if not already done
    if (!global.MatterReanimated) {
      //@ts-ignore
      (0, _matterJsReanimated.default)();
    }
    let engine;
    if (global.MatterReanimated && engineId in global.MatterReanimated) {
      //@ts-ignore
      engine = global.MatterReanimated[engineId];
      global.MatterReanimated.Composite.clear(engine.world, false, true);
    }
    if (!global.MatterReanimated) {
      console.warn('Matter.js not initialized! Run initMatter() first.');
      return;
    }
    engine = global.MatterReanimated.Engine.create({
      enableSleeping: false,
      gravity: {
        x: 0,
        y: 1,
        scale: 0.001
      }
    });

    //@ts-ignore
    global.MatterReanimated[engineId] = engine;
    if (worklet) {
      worklet(engine);
    }
    (0, _reactNativeReanimated.runOnJS)(setInitialized)(true);
  }, [worklet, engineId]);
  (0, _react.useEffect)(() => {
    (0, _reactNativeReanimated.runOnUI)(initUI)();
  }, [initUI]);
  return initialized;
};
exports.useInitWorklet = useInitWorklet;
//# sourceMappingURL=useInitWorklet.js.map