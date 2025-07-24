declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initStress3 = (engine: any) => {
  'worklet';

  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Common, World } = global.MatterReanimated;

  const bodyScale = 0.3 * scale;

  const stack = Composites.stack(
    40 * scale,
    40 * scale,
    38,
    18,
    0,
    0,
    (x: number, y: number) => {
      const sides = Math.round(Common.random(1, 8));

      switch (Math.round(Common.random(0, 1))) {
        case 0:
          if (Common.random() < 0.8) {
            return Bodies.rectangle(
              x,
              y,
              Common.random(25, 50) * bodyScale,
              Common.random(25, 50) * bodyScale
            );
          } else {
            return Bodies.rectangle(
              x,
              y,
              Common.random(80, 120) * bodyScale,
              Common.random(25, 30) * bodyScale
            );
          }
        case 1:
          return Bodies.polygon(x, y, sides, Common.random(25, 50) * bodyScale);
      }
    }
  );

  World.add(engine.world, stack);
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

  engine.gravity.y = 1;
};
