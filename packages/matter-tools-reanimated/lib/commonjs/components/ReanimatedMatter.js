"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReanimatedMatter = void 0;
var _react = _interopRequireDefault(require("react"));
var _useInitWorklet = require("../hooks/useInitWorklet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * A component that ensures Matter.js is initialized on the UI thread
 * before rendering its children. This prevents race conditions and ensures Matter
 * is available in worklets.
 */
const ReanimatedMatter = ({
  children,
  worklet,
  engineId = 'defaultEngine'
}) => {
  const isInitialized = (0, _useInitWorklet.useInitWorklet)(worklet || (() => {
    'worklet';
  }),
  // Default empty worklet if none provided
  engineId);

  // Don't render children until Matter.js is initialized
  if (!isInitialized) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
};
exports.ReanimatedMatter = ReanimatedMatter;
//# sourceMappingURL=ReanimatedMatter.js.map