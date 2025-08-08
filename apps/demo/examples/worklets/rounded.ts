export const initRoundedCorners = (engine: any) => {
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

    Bodies.rectangle(200 * scale, 200 * scale, 100 * scale, 100 * scale, {
      chamfer: { radius: 20 * scale },
    }),

    Bodies.rectangle(300 * scale, 200 * scale, 100 * scale, 100 * scale, {
      chamfer: { radius: [90 * scale, 0, 0, 0] },
    }),

    Bodies.rectangle(400 * scale, 200 * scale, 200 * scale, 200 * scale, {
      chamfer: {
        radius: [150 * scale, 20 * scale, 40 * scale, 20 * scale],
      },
    }),

    Bodies.rectangle(200 * scale, 200 * scale, 200 * scale, 200 * scale, {
      chamfer: {
        radius: [150 * scale, 20 * scale, 150 * scale, 20 * scale],
      },
    }),

    Bodies.rectangle(300 * scale, 200 * scale, 200 * scale, 50 * scale, {
      chamfer: { radius: [25 * scale, 25 * scale, 0, 0] },
    }),

    Bodies.polygon(200 * scale, 100 * scale, 8, 80 * scale, {
      chamfer: { radius: 30 * scale },
    }),

    Bodies.polygon(300 * scale, 100 * scale, 5, 80 * scale, {
      chamfer: {
        radius: [10 * scale, 40 * scale, 20 * scale, 40 * scale, 10 * scale],
      },
    }),

    Bodies.polygon(400 * scale, 200 * scale, 3, 50 * scale, {
      chamfer: { radius: [20 * scale, 0, 20 * scale] },
    }),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
