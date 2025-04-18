"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Demo = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _withMatter = require("../hoc/withMatter");
var _Render = require("./Render");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import { Touch } from './Touch';

const DemoComponent = ({
  example,
  options = {}
}) => {
  _react.default.useEffect(() => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (!global.Matter) {
        console.warn('Matter.js not initialized! Run initMatter() first.');
        return;
      }
      const engine = global.Matter.Engine.create({
        enableSleeping: false,
        gravity: {
          x: 0,
          y: 1,
          scale: 0.001
        }
      });
      global.demoEngine = engine;
      if (example in global) {
        global.demoes[example]?.(engine);
      }
      console.log(`Demo example "${example}" initialized".`);
    })();
    return () => {
      (0, _reactNativeReanimated.runOnUI)(() => {
        'worklet';

        if (global.demoEngine) {
          global.Matter.Composite.clear(global.demoEngine.world, false, true);
          global.demoEngine = undefined;
        }
      })();
    };
  }, [example]);
  (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    if (!global.demoEngine) return;
    global.Matter.Engine.update(global.demoEngine, 16.667 // Use fixed timestep for demos
    );
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_Render.Render, {
    engineId: "demoEngine",
    options: options.render
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
const Demo = exports.Demo = (0, _withMatter.withMatter)(DemoComponent);
//# sourceMappingURL=Demo.js.map