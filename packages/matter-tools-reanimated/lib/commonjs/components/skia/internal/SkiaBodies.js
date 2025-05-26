"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiaBodies = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSkia = require("@shopify/react-native-skia");
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SkiaBodies = ({
  options = {}
}) => {
  const {
    width: windowWidth,
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const width = options.width || windowWidth;
  const height = options.height || windowHeight;

  // Shared value to hold the Skia image snapshot of the scene
  const image = (0, _reactNativeReanimated.useSharedValue)(null);

  /**
   * Draws the entire scene onto an offscreen Skia surface and creates an image snapshot.
   * This function is a worklet and runs on the UI thread.
   * @param imgRef A shared value reference to store the resulting Skia image.
   */
  const drawScene = imgRef => {
    'worklet';

    // Marks this function as a Reanimated worklet

    // Create an offscreen Skia surface with the specified dimensions
    const surface = _reactNativeSkia.Skia.Surface.MakeOffscreen(width, height);
    if (!surface) {
      // If surface creation fails, return early
      console.error('Failed to create Skia surface.');
      return;
    }
    const canvas = surface.getCanvas();

    // Clear the canvas with the specified background color, or white by default
    canvas.clear(_reactNativeSkia.Skia.Color(options.background || 'white'));

    // Check if global.svgContent is an array; if not, snapshot and return
    // global.svgContent is expected to contain the Matter.js bodies' render data
    if (!Array.isArray(global.svgContent)) {
      imgRef.value = surface.makeImageSnapshot();
      return;
    }

    // Iterate over each body in the global.svgContent array
    for (const body of global.svgContent) {
      // If body.render exists and body.render.visible is explicitly false, skip rendering this body.
      // If body.render or body.render.visible is undefined/null, or true, it will be rendered.
      if (body.render?.visible === false) {
        continue; // Skip to the next body
      }

      // Create a new Skia Path for the current body
      const skPath = _reactNativeSkia.Skia.Path.Make();

      // Handle circle bodies
      if (body.type === 'circle' && body.circleRadius !== undefined) {
        skPath.addCircle(body.position.x, body.position.y, body.circleRadius);
      } else {
        // Handle polygon/other bodies
        const verts = body.vertices;
        if (verts && verts.length > 0) {
          // Move to the first vertex
          skPath.moveTo(verts[0].x, verts[0].y);
          // Draw lines to subsequent vertices
          for (let j = 1; j < verts.length; j++) {
            skPath.lineTo(verts[j].x, verts[j].y);
          }
          skPath.close(); // Close the path to form a polygon
        }
      }

      // Create and configure the fill paint
      const fillPaint = _reactNativeSkia.Skia.Paint();
      fillPaint.setAntiAlias(true); // Enable anti-aliasing for smoother edges
      fillPaint.setStyle(_reactNativeSkia.PaintStyle.Fill); // Set paint style to fill
      fillPaint.setColor(_reactNativeSkia.Skia.Color(options.wireframes ? 'transparent' // If wireframes option is true, fill is transparent
      : body.render?.fillStyle || '#000000' // Use body's fillStyle or default to black
      ));
      canvas.drawPath(skPath, fillPaint); // Draw the path with the fill paint

      // Optional stroke for wireframes or if body has a strokeStyle
      if (options.wireframes || body.render?.strokeStyle) {
        const strokePaint = _reactNativeSkia.Skia.Paint();
        strokePaint.setStyle(_reactNativeSkia.PaintStyle.Stroke); // Set paint style to stroke
        strokePaint.setStrokeWidth(body.render?.lineWidth || 1); // Use body's lineWidth or default to 1
        strokePaint.setColor(_reactNativeSkia.Skia.Color(body.render?.strokeStyle || '#2E3440') // Use body's strokeStyle or default to a dark grey
        );
        canvas.drawPath(skPath, strokePaint); // Draw the path with the stroke paint
      }
    }
    surface.flush(); // Ensure all drawing operations are committed to the surface
    imgRef.value = surface.makeImageSnapshot(); // Create a snapshot of the drawn scene
  };

  // Use useFrameCallback to redraw the scene on every frame
  (0, _reactNativeReanimated.useFrameCallback)(() => {
    'worklet';

    // Marks this callback as a Reanimated worklet
    drawScene(image); // Call drawScene to update the image shared value
  });

  // Render the Skia Image component, which displays the snapshot from the shared value
  return /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Image, {
    image: image,
    x: 0,
    y: 0,
    width: width,
    height: height
  });
};
exports.SkiaBodies = SkiaBodies;
//# sourceMappingURL=SkiaBodies.js.map