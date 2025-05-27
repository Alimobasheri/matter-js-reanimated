"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Demo = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _ReanimatedMatter = require("./ReanimatedMatter");
var _Render = require("./Render");
var _TouchConstraint = require("./TouchConstraint");
var _SkiaRender = require("./skia/SkiaRender");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Demo = ({
  exampleWorklet,
  options = {}
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_ReanimatedMatter.ReanimatedMatter, {
    worklet: exampleWorklet,
    engineId: "demoEngine"
  }, /*#__PURE__*/_react.default.createElement(_TouchConstraint.TouchConstraint, {
    engineId: "demoEngine",
    options: options.touch
  }, options.skia ? /*#__PURE__*/_react.default.createElement(_SkiaRender.SkiaRender, {
    engineId: "demoEngine",
    options: options.render
  }) : /*#__PURE__*/_react.default.createElement(_Render.Render, {
    engineId: "demoEngine",
    options: options.render
  }))));
};
exports.Demo = Demo;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
//# sourceMappingURL=Demo.js.map