"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Demo = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _withMatter = require("../hoc/withMatter");
var _Render = require("./Render");
var _Touch = require("./Touch");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { Touch } from './Touch';

const DemoComponent = ({
  exampleWorklet,
  options = {}
}) => {
  const [initialized, setInitialized] = (0, _react.useState)(false);
  _react.default.useEffect(() => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      console.log('Initializing demo example');
      if (global.demoEngine && global.Matter) {
        console.log('Clearing demo engine');
        global.Matter.Composite.clear(global.demoEngine.world, false, true);
        // global.demoEngine = undefined;
      }
      console.log('Creating demo engine');
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
      exampleWorklet(engine);
      console.log('Demo example initialized');
      (0, _reactNativeReanimated.runOnJS)(setInitialized)(true);
    })();
  }, [exampleWorklet]);
  (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    if (!global.demoEngine) return;
    global.Matter.Engine.update(global.demoEngine, 16.667 // Use fixed timestep for demos
    );
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, initialized && /*#__PURE__*/_react.default.createElement(_Touch.Touch, {
    engineId: "demoEngine",
    options: options.touch
  }, /*#__PURE__*/_react.default.createElement(_Render.Render, {
    engineId: "demoEngine",
    options: options.render
  })));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
const Demo = exports.Demo = (0, _withMatter.withMatter)(DemoComponent);
//# sourceMappingURL=Demo.js.map