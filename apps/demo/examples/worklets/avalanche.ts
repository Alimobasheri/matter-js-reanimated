
export const initAvalanche = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.MatterReanimated.windowWidth || 800;
  const height = global.MatterReanimated.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, World } = global.MatterReanimated;

  // Add bodies
  // Create stack of circles with low friction and restitution
  const stack = Composites.stack(
    20,
    20,
    20,
    5,
    0,
    0,
    (x: number, y: number) => {
      return Bodies.circle(
        x,
        y,
        global.MatterReanimated.Common.random(10, 20) * scale,
        {
          friction: 0.00001,
          restitution: 0.5,
          density: 0.001,
        }
      );
    }
  );

  World.add(engine.world, stack);

  // Add inclined platforms
  World.add(engine.world, [
    Bodies.rectangle(200 * scale, 150 * scale, 700 * scale, 20 * scale, {
      isStatic: true,
      angle: Math.PI * 0.06,
    }),
    Bodies.rectangle(500 * scale, 350 * scale, 700 * scale, 20 * scale, {
      isStatic: true,
      angle: -Math.PI * 0.06,
    }),
    Bodies.rectangle(340 * scale, 580 * scale, 700 * scale, 20 * scale, {
      isStatic: true,
      angle: Math.PI * 0.04,
    }),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
