
export const initTimeScale = (engine: any) => {
  'worklet';

  const width = global.MatterReanimated.windowWidth || 800;
  const height = global.MatterReanimated.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Common, World, Body } = global.MatterReanimated;

  // Add walls
  World.add(engine.world, [
    Bodies.rectangle(400 * scale, 0, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(400 * scale, height, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(800 * scale, 300 * scale, 50 * scale, 600 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(0, 300 * scale, 50 * scale, 600 * scale, {
      isStatic: true,
    }),
  ]);

  const bodyOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 0.8,
  };

  // Add circle stack
  World.add(
    engine.world,
    Composites.stack(
      20 * scale,
      100 * scale,
      15,
      3,
      20 * scale,
      40 * scale,
      (x: number, y: number) => {
        return Bodies.circle(x, y, Common.random(10, 20) * scale, bodyOptions);
      }
    )
  );

  // Add random shape stack
  World.add(
    engine.world,
    Composites.stack(
      50 * scale,
      50 * scale,
      8,
      3,
      0,
      0,
      (x: number, y: number) => {
        switch (Math.round(Common.random(0, 1))) {
          case 0:
            if (Common.random() < 0.8) {
              return Bodies.rectangle(
                x,
                y,
                Common.random(20, 50) * scale,
                Common.random(20, 50) * scale,
                bodyOptions
              );
            } else {
              return Bodies.rectangle(
                x,
                y,
                Common.random(80, 120) * scale,
                Common.random(20, 30) * scale,
                bodyOptions
              );
            }
          case 1:
            return Bodies.polygon(
              x,
              y,
              Math.round(Common.random(4, 8)),
              Common.random(20, 50) * scale,
              bodyOptions
            );
        }
      }
    )
  );

  // Set initial timing
  engine.timing.timeScale = 1;
  engine.gravity.y = 1;
};
