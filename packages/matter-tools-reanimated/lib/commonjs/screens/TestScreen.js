"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TestScreen;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function TestScreen() {
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  _react.default.useEffect(() => {
    // // Make dimensions available to worklets
    // runOnUI(() => {
    //   'worklet';
    //   global.windowWidth = width;
    //   global.windowHeight = height;
    // })();
  }, [width, height]);
  return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  });
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
//# sourceMappingURL=TestScreen.js.map