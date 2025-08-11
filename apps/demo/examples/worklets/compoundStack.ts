// examples/worklets/CompoundStack.ts

export const initCompoundStack = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.MatterToolsReanimated.windowWidth || 800;
  const height = global.MatterToolsReanimated.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, Body, World } =
    global.MatterReanimated;

  // Create compound stack bodies
  const size = 50 * scale;
  const stack = Composites.stack(
    100 * scale,
    height - 17 * scale - size * 6,
    12,
    6,
    0,
    0,
    (x: number, y: number) => {
      const partA = Bodies.rectangle(x, y, size, size / 5);
      const partB = Bodies.rectangle(x, y, size / 5, size, {
        render: partA.render,
      });

      return Body.create({
        parts: [partA, partB],
      });
    }
  );

  // Add all bodies to world
  World.add(engine.world, [
    stack,
    // walls
    Bodies.rectangle(width / 2, 0, width, 50 * scale, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 50 * scale, height, {
      isStatic: true,
    }),
    Bodies.rectangle(0, height / 2, 50 * scale, height, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 50 * scale, {
      isStatic: true,
    }),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
