export const initAirFriction = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.MatterToolsReanimated.windowWidth || 800;
  const height = global.MatterToolsReanimated.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, World } = global.MatterReanimated;

  // add bodies
  World.add(engine.world, [
    // falling blocks with different air friction
    Bodies.rectangle(200 * scale, 100 * scale, 60 * scale, 60 * scale, {
      frictionAir: 0.001,
    }),
    Bodies.rectangle(400 * scale, 100 * scale, 60 * scale, 60 * scale, {
      frictionAir: 0.05,
    }),
    Bodies.rectangle(600 * scale, 100 * scale, 60 * scale, 60 * scale, {
      frictionAir: 0.1,
    }),

    // walls
    Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 50, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 50, height, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 50, height, { isStatic: true }),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
