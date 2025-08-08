"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TestScreen;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Demo = require("../components/Demo");
var _cloth = require("../examples/cloth");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function TestScreen() {
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const exampleWorklet = (0, _react.useCallback)(engine => {
    'worklet';

    global.MatterReanimated.windowWidth = width;
    global.MatterReanimated.windowHeight = height;
    (0, _cloth.initCloth)(engine);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_Demo.Demo, {
    exampleWorklet: exampleWorklet,
    options: {
      render: {
        wireframes: false,
        showConstraints: true
      },
      touch: {
        constraint: {
          stiffness: 0.2,
          damping: 0.3
        },
        enablePan: true
      },
      skia: true
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