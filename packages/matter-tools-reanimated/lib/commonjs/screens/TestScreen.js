"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TestScreen;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _Demo = require("../components/Demo");
var _avalanche = require("../examples/avalanche");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function TestScreen() {
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  _react.default.useEffect(() => {
    // Make dimensions available to worklets
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      global.windowWidth = width;
      global.windowHeight = height;
    })();
  }, [width, height]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_Demo.Demo, {
    exampleWorklet: _avalanche.initAvalanche,
    options: {
      render: {
        wireframes: true,
        showBounds: true,
        showPositions: true
      },
      touch: {
        constraint: {
          stiffness: 0.2,
          damping: 0.3
        }
      }
    }
  }));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
//# sourceMappingURL=TestScreen.js.map