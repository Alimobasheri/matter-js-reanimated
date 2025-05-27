"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Render = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNativeSvg = _interopRequireDefault(require("react-native-svg"));
var _Bodies = require("./Bodies");
var _Constraints = require("./Constraints");
var _Runner = require("./Runner");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
//@ts-ignore

const Render = ({
  engineId = 'physicsEngine',
  options = {}
}) => {
  const {
    width: windowWidth,
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const width = options.width || windowWidth;
  const height = options.height || windowHeight;
  const {
    setActive
  } = (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    if (!global.Matter || !(engineId in global)) return;
    if (!global.svgContent) global.svgContent = [];
    if (!global.svgConstraints) global.svgConstraints = [];
    const engine = global[engineId];
    if (!engine || !engine.world) return;
    // Use Composite.allBodies to get all bodies including those in nested composites
    const bodies = global.Matter.Composite.allBodies(engine.world);

    // Generate SVG elements for each body - this runs in the UI thread
    global.svgContent = bodies.map(body => ({
      id: body.id,
      type: body.circleRadius ? 'circle' : 'polygon',
      position: {
        ...body.position
      },
      angle: body.angle,
      vertices: body.vertices.map(v => ({
        ...v
      })),
      bounds: {
        min: {
          ...body.bounds.min
        },
        max: {
          ...body.bounds.max
        }
      },
      circleRadius: body.circleRadius,
      render: body.render
    }));
    const constraints = global.Matter.Composite.allConstraints(engine.world);
    global.svgConstraints = constraints.map(constraint => ({
      id: constraint.id,
      bodyAId: constraint.bodyA?.id,
      bodyBId: constraint.bodyB?.id,
      pointA: {
        x: constraint.pointA.x,
        y: constraint.pointA.y
      },
      pointB: {
        x: constraint.pointB.x,
        y: constraint.pointB.y
      },
      type: constraint.render.type || 'spring',
      render: {
        visible: constraint.render.visible !== false,
        strokeStyle: constraint.render.strokeStyle || '#bbb',
        lineWidth: constraint.render.lineWidth || 1,
        anchors: constraint.render.anchors || false
      }
    }));
  });
  (0, _react.useEffect)(() => {
    return () => {
      setActive(false);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      width,
      height
    }]
  }, /*#__PURE__*/_react.default.createElement(_Runner.Runner, {
    engineId: "demoEngine",
    options: {
      enabled: true
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    width: width,
    height: height,
    style: [styles.svg, {
      backgroundColor: options.background || 'transparent'
    }]
  }, /*#__PURE__*/_react.default.createElement(_Bodies.Bodies, {
    options: options
  }), options.showConstraints && /*#__PURE__*/_react.default.createElement(_Constraints.Constraints, {
    options: options
  })));
};
exports.Render = Render;
const styles = _reactNative.StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  svg: {
    flex: 1
  }
});
//# sourceMappingURL=Render.js.map