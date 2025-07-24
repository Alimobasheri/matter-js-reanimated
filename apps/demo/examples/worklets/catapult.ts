// examples/worklets/Catapult.ts
declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initCatapult = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, Body, Constraint, World, Vector } =
    global.MatterReanimated;

  // Create group for catapult pieces
  const group = Body.nextGroup(true);

  // Create stack of blocks
  const stack = Composites.stack(
    250 * scale,
    255 * scale,
    1,
    6,
    0,
    0,
    (x: number, y: number) => {
      return Bodies.rectangle(x, y, 30 * scale, 30 * scale);
    }
  );

  // Create catapult base
  const catapult = Bodies.rectangle(
    400 * scale,
    520 * scale,
    320 * scale,
    20 * scale,
    { collisionFilter: { group: group } }
  );

  // Add all bodies to world
  World.add(engine.world, [
    stack,
    catapult,
    // Ground
    Bodies.rectangle(400 * scale, 600 * scale, 800 * scale, 50.5 * scale, {
      isStatic: true,
    }),
    // Left support
    Bodies.rectangle(250 * scale, 555 * scale, 20 * scale, 50 * scale, {
      isStatic: true,
    }),
    // Middle support
    Bodies.rectangle(400 * scale, 535 * scale, 20 * scale, 80 * scale, {
      isStatic: true,
      collisionFilter: { group: group },
    }),
    // Ball
    Bodies.circle(560 * scale, 100 * scale, 50 * scale, { density: 0.005 }),
    // Catapult constraint
    Constraint.create({
      bodyA: catapult,
      pointB: Vector.clone(catapult.position),
      stiffness: 1,
      length: 0,
    }),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
