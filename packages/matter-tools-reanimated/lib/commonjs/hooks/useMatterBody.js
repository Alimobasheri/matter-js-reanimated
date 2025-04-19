"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMatterBody = useMatterBody;
var _reactNativeReanimated = require("react-native-reanimated");
function useMatterBody(bodyId) {
  return (0, _reactNativeReanimated.useDerivedValue)(() => {
    'worklet';

    const defaultState = {
      position: {
        x: 0,
        y: 0
      },
      angle: 0,
      bounds: {
        min: {
          x: 0,
          y: 0
        },
        max: {
          x: 0,
          y: 0
        }
      },
      vertices: []
    };
    if (!global.Matter || !(bodyId in global)) {
      return defaultState;
    }

    //@ts-ignore
    const body = global[bodyId];
    return {
      position: {
        ...body.position
      },
      angle: body.angle,
      bounds: {
        min: {
          ...body.bounds.min
        },
        max: {
          ...body.bounds.max
        }
      },
      vertices: body.vertices.map(v => ({
        ...v
      }))
    };
  });
}
//# sourceMappingURL=useMatterBody.js.map