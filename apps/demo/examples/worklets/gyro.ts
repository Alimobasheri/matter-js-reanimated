
export const initGyro = (engine: any) => {
  'worklet';

  const width = global.MatterToolsReanimated.windowWidth || 800;
  const height = global.MatterToolsReanimated.windowHeight || 600;
  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, Body, World, Common } =
    global.MatterReanimated;

  const stack = Composites.stack(
    20 * scale,
    20 * scale,
    10,
    5,
    0,
    0,
    (x: number, y: number) => {
      const sides = Math.round(Common.random(1, 8));
      let chamfer = null;

      if (sides > 2 && Common.random() > 0.7) {
        chamfer = { radius: 10 * scale };
      }

      switch (Math.round(Common.random(0, 1))) {
        case 0:
          if (Common.random() < 0.8) {
            return Bodies.rectangle(
              x,
              y,
              Common.random(25, 50) * scale,
              Common.random(25, 50) * scale,
              { chamfer }
            );
          } else {
            return Bodies.rectangle(
              x,
              y,
              Common.random(80, 120) * scale,
              Common.random(25, 30) * scale,
              { chamfer }
            );
          }
        case 1:
          return Bodies.polygon(x, y, sides, Common.random(25, 50) * scale, {
            chamfer,
          });
      }
    }
  );

  World.add(engine.world, [
    stack,
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

  engine.gravity.x = 0;
  engine.gravity.y = 1;
};
