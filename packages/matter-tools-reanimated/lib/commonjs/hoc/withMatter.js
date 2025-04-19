"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withMatter = withMatter;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = require("react-native-reanimated");
var _matterJsReanimated = _interopRequireDefault(require("matter-js-reanimated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import the default export which is the init function

/**
 * A Higher-Order Component that ensures Matter.js is initialized on the UI thread
 * before rendering its children. This prevents race conditions and ensures Matter
 * is available in worklets.
 */
function withMatter(WrappedComponent) {
  return function WithMatterComponent(props) {
    const [isInitialized, setIsInitialized] = (0, _react.useState)(false);
    (0, _react.useEffect)(() => {
      // Initialize Matter.js on the UI thread
      (0, _reactNativeReanimated.runOnUI)(() => {
        'worklet';

        // Only initialize if not already done
        if (!global.Matter) {
          //@ts-ignore
          (0, _matterJsReanimated.default)();
        }
        (0, _reactNativeReanimated.runOnJS)(setIsInitialized)(true);
      })();
    }, []);

    // Don't render children until Matter.js is initialized
    if (!isInitialized) {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement(WrappedComponent, props);
  };
}
//# sourceMappingURL=withMatter.js.map