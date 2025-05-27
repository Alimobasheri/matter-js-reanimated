"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomScreen = void 0;
var _reactNativeReanimated = require("react-native-reanimated");
var _animatedDemo = require("../examples/animatedDemo");
var _useInitWorklet = require("../hooks/useInitWorklet");
var _Sign = require("./components/Sign");
const CustomScreen = () => {
  const initialized = (0, _useInitWorklet.useInitWorklet)(_animatedDemo.initAniamtedDemo, 'demoEngine');
  (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    if (!global.demoEngine) return;
    global.Matter.Engine.update(global.demoEngine, 16.667 // Use fixed timestep for demos
    );
  });
  return initialized ? /*#__PURE__*/React.createElement(_Sign.Sign, null) : null;
};
exports.CustomScreen = CustomScreen;
//# sourceMappingURL=CustomScreen.js.map