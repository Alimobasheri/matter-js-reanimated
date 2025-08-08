"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sign = void 0;
var _useDerivedMatterBody = require("@/src/hooks/useDerivedMatterBody");
var _useDerivedMatterConstraint = require("@/src/hooks/useDerivedMatterConstraint");
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getBodySize(body) {
  'worklet';

  const vertices = body.vertices;
  const width = Math.hypot(vertices[1].x - vertices[0].x, vertices[1].y - vertices[0].y);
  const height = Math.hypot(vertices[2].x - vertices[1].x, vertices[2].y - vertices[1].y);
  return {
    width,
    height
  };
}
function getTopLeftPosition(body) {
  'worklet';

  const {
    width,
    height
  } = getBodySize(body);
  return {
    x: body.position.x - width / 2,
    y: body.position.y - height / 2
  };
}
const processBody = body => {
  'worklet';

  const {
    width,
    height
  } = getBodySize(body);
  const {
    x,
    y
  } = getTopLeftPosition(body);
  return {
    x,
    y,
    width,
    height,
    angle: body.angle
  };
};
const processConstraint = constraint => {
  'worklet';

  const pointAWorld = constraint.pointA;
  let pointBWorld = constraint.pointB;
  if (constraint.bodyB) {
    const bodyBPosition = constraint.bodyB.position;
    const bodyBAngle = constraint.bodyB.angle;
    const rotatedPoint = global.MatterReanimated.Vector.rotate(constraint.pointB, bodyBAngle);
    pointBWorld = global.MatterReanimated.Vector.add(bodyBPosition, rotatedPoint);
  }
  return {
    x: pointAWorld.x,
    y: pointAWorld.y,
    x2: pointBWorld.x,
    y2: pointBWorld.y
  };
};
const ConstraintLine = ({
  constraint
}) => {
  const lineStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    if (!constraint.value) return {};
    const startX = constraint.value.x;
    const startY = constraint.value.y;
    const endX = constraint.value.x2;
    const endY = constraint.value.y2;
    const length = Math.hypot(endX - startX, endY - startY);
    const angle = Math.atan2(endY - startY, endX - startX);
    return {
      position: 'absolute',
      left: startX,
      top: startY,
      width: length,
      height: 2,
      backgroundColor: 'red',
      transform: [{
        rotate: `${angle}rad`
      }],
      transformOrigin: '0% 50%'
    };
  });
  return /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
    style: lineStyle
  });
};
const Sign = () => {
  const data = (0, _useDerivedMatterBody.useDerivedMatterBody)({
    label: 'signBody'
  }, 'demoEngine', processBody);
  const constraint1 = (0, _useDerivedMatterConstraint.useDerivedMatterConstraint)({
    label: 'signConstraint1'
  }, 'demoEngine', processConstraint);
  const constraint2 = (0, _useDerivedMatterConstraint.useDerivedMatterConstraint)({
    label: 'signConstraint2'
  }, 'demoEngine', processConstraint);
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    if (!data.value) return {
      position: 'absolute'
    };
    return {
      position: 'absolute',
      top: data.value.y,
      // Removed the extra subtraction
      left: data.value.x,
      // Removed the extra subtraction
      transform: [{
        rotate: `${data.value.angle}rad`
      }],
      width: data.value.width,
      height: data.value.height
    };
  }, [data]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      position: 'relative',
      flex: 1,
      backgroundColor: 'white'
    }
  }, /*#__PURE__*/React.createElement(ConstraintLine, {
    constraint: constraint1
  }), /*#__PURE__*/React.createElement(ConstraintLine, {
    constraint: constraint2
  }), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
    style: [animatedStyle, {
      backgroundColor: 'yellow',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, null, "Welcome To MatterJS Reanimated!")));
};
exports.Sign = Sign;
//# sourceMappingURL=Sign.js.map