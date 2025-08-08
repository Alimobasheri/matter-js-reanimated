export const initFriction = (engine: any) => {
  'worklet';

  const width = global.MatterReanimated.windowWidth || 800;
  const height = global.MatterReanimated.windowHeight || 600;
  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composite, World } = global.MatterReanimated;

  // Add bodies
  World.add(engine.world, [
    // walls
    Bodies.rectangle(400 * scale, 0, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(400 * scale, 600 * scale, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(800 * scale, 300 * scale, 50 * scale, 600 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(0, 300 * scale, 50 * scale, 600 * scale, {
      isStatic: true,
    }),
  ]);

  World.add(engine.world, [
    Bodies.rectangle(300 * scale, 180 * scale, 700 * scale, 20 * scale, {
      isStatic: true,
      angle: Math.PI * 0.06,
      render: { fillStyle: '#060a19' },
    }),
    Bodies.rectangle(300 * scale, 70 * scale, 40 * scale, 40 * scale, {
      friction: 0.001,
    }),
  ]);

  World.add(engine.world, [
    Bodies.rectangle(300 * scale, 350 * scale, 700 * scale, 20 * scale, {
      isStatic: true,
      angle: Math.PI * 0.06,
      render: { fillStyle: '#060a19' },
    }),
    Bodies.rectangle(300 * scale, 250 * scale, 40 * scale, 40 * scale, {
      friction: 0.0005,
    }),
  ]);

  World.add(engine.world, [
    Bodies.rectangle(300 * scale, 520 * scale, 700 * scale, 20 * scale, {
      isStatic: true,
      angle: Math.PI * 0.06,
      render: { fillStyle: '#060a19' },
    }),
    Bodies.rectangle(300 * scale, 430 * scale, 40 * scale, 40 * scale, {
      friction: 0,
    }),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
