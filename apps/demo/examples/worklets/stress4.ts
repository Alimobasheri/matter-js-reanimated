
export const initStress4 = (engine: any) => {
  'worklet';

  const width = global.MatterToolsReanimated.windowWidth || 800;
  const height = global.MatterToolsReanimated.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Common, World } = global.MatterReanimated;

  const stack = (bodyScale: number, columns: number, rows: number) => {
    return Composites.stack(
      40 * scale,
      40 * scale,
      columns,
      rows,
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
                Common.random(25, 50) * bodyScale * scale,
                Common.random(25, 50) * bodyScale * scale
              );
            } else {
              return Bodies.rectangle(
                x,
                y,
                Common.random(80, 120) * bodyScale * scale,
                Common.random(25, 30) * bodyScale * scale
              );
            }
          case 1:
            return Bodies.polygon(
              x,
              y,
              sides,
              Common.random(25, 50) * bodyScale * scale
            );
        }
      }
    );
  };

  World.add(engine.world, [
    stack(0.2, 61, 15),
    stack(0.3, 31, 12),
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

  engine.timing.timeScale = 0.9;
  engine.gravity.scale = 0.0007 * scale;
  engine.gravity.x = Math.cos(0);
  engine.gravity.y = Math.sin(0);
};
