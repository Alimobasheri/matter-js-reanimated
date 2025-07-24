// examples/worklets/pyramid.ts
declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initPyramid = (engine: any) => {
  'worklet';

  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, World } = global.MatterReanimated;

  const stack = Composites.pyramid(
    100 * scale,
    605 * scale - 25 * scale - 16 * 20 * scale,
    15,
    10,
    0,
    0,
    (x: number, y: number) => {
      return Bodies.rectangle(x, y, 40 * scale, 40 * scale);
    }
  );

  World.add(engine.world, [
    stack,
    Bodies.rectangle(400 * scale, 0, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(800 * scale, 300 * scale, 50 * scale, 600 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(0, 300 * scale, 50 * scale, 600 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(400 * scale, 605 * scale, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
  ]);

  engine.gravity.y = 1;
};
