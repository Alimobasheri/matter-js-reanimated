declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initBallPool = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, World } = global.MatterReanimated;

  // Add bottom wall and side walls to contain the balls
  World.add(engine.world, [
    // Bottom wall
    Bodies.rectangle(width / 2, height, width * 1.5, 50.5, {
      isStatic: true,
    }),
    // Left wall
    Bodies.rectangle(-25, height / 2, 50, height, {
      isStatic: true,
    }),
    // Right wall
    Bodies.rectangle(width + 25, height / 2, 50, height, {
      isStatic: true,
    }),
  ]);

  // Create ball pool with adjusted positioning
  const stack = Composites.stack(
    width * 0.1,
    -height * 0.5, // x, y (start above screen)
    8,
    6, // columns, rows (reduced for better performance)
    20,
    20, // columnGap, rowGap (increased spacing)
    (x: number, y: number) => {
      return Bodies.circle(
        x,
        y,
        global.MatterReanimated.Common.random(15, 30) * scale, // slightly smaller balls
        {
          restitution: 0.6,
          friction: 0.1,
          density: 0.0008, // make balls lighter
        }
      );
    }
  );

  // Add stack and some polygons positioned relative to screen size
  World.add(engine.world, [
    stack,
    Bodies.polygon(200 * scale, 460 * scale, 3, 60 * scale),
    Bodies.polygon(400 * scale, 460 * scale, 5, 60 * scale),
    Bodies.rectangle(600 * scale, 460 * scale, 80, 80 * scale),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
