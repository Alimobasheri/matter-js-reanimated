
export const initStress2 = (engine: any) => {
  'worklet';

  const width = global.MatterToolsReanimated.windowWidth || 800;
  const height = global.MatterToolsReanimated.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, World } = global.MatterReanimated;

  const stack = Composites.stack(
    100 * scale,
    height - 25 * scale - 18 * 25 * scale,
    25,
    18,
    0,
    0,
    (x: number, y: number) => {
      return Bodies.rectangle(x, y, 25 * scale, 25 * scale);
    }
  );

  World.add(engine.world, [
    stack,
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
