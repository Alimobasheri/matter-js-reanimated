"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiaRender = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSkia = require("@shopify/react-native-skia");
var _SkiaBodies = require("./SkiaBodies");
var _SkiaConstraints = require("./SkiaConstraints");
var _Runner = require("../../Runner");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SkiaRender = ({
  engineId = 'physicsEngine',
  options = {}
}) => {
  const {
    width: windowWidth,
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const width = options.width || windowWidth;
  const height = options.height || windowHeight;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      width,
      height
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Canvas, {
    style: [styles.svg, {
      backgroundColor: options.background || 'transparent',
      width,
      height
    }]
  }, /*#__PURE__*/_react.default.createElement(_Runner.Runner, {
    engineId: "demoEngine",
    options: {
      enabled: true
    }
  }), /*#__PURE__*/_react.default.createElement(_SkiaBodies.SkiaBodies, {
    options: options,
    engineId: engineId
  }), options.showConstraints && /*#__PURE__*/_react.default.createElement(_SkiaConstraints.SkiaConstraints, {
    options: options,
    engineId: engineId
  })));
};
exports.SkiaRender = SkiaRender;
const styles = _reactNative.StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  svg: {
    flex: 1
  }
});
//# sourceMappingURL=SkiaRender.js.map