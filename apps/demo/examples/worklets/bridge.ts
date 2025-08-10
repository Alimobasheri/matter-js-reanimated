
export const initBridge = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.MatterToolsReanimated.windowWidth || 800;
  const height = global.MatterToolsReanimated.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, Body, Constraint, World } =
    global.MatterReanimated;

  // Create group for bridge pieces
  const group = Body.nextGroup(true);

  // Create bridge segments
  const bridge = Composites.stack(
    160 * scale,
    290 * scale,
    15,
    1,
    0,
    0,
    (x: number, y: number) => {
      return Bodies.rectangle(x - 20 * scale, y, 53 * scale, 20 * scale, {
        collisionFilter: {
          group,
        },
        chamfer: { radius: 5 },
        density: 0.005,
        frictionAir: 0.05,
      });
    }
  );

  // Chain bridge segments together
  Composites.chain(bridge, 0.3 * scale, 0, -0.3 * scale, 0, {
    stiffness: 0.99,
    length: 0.0001,
  });

  // Create a stack of blocks to fall onto the bridge
  const stack = Composites.stack(
    250 * scale,
    50 * scale,
    6,
    3,
    0,
    0,
    (x: number, y: number) => {
      return Bodies.rectangle(x, y, 50 * scale, 50 * scale);
    }
  );

  // Add all bodies to world
  World.add(engine.world, [
    bridge,
    stack,
    // Left wall
    Bodies.rectangle(30 * scale, 490 * scale, 220 * scale, 380 * scale, {
      isStatic: true,
      chamfer: { radius: 20 * scale },
    }),
    Bodies.rectangle(770 * scale, 490 * scale, 220 * scale, 380 * scale, {
      isStatic: true,
      chamfer: { radius: 20 * scale },
    }),
    Constraint.create({
      pointA: { x: 140 * scale, y: 300 * scale },
      bodyB: bridge.bodies[0],
      pointB: { x: -25 * scale, y: 0 },
      length: 2,
      stiffness: 0.9,
    }),
    Constraint.create({
      pointA: { x: 660 * scale, y: 300 * scale },
      bodyB: bridge.bodies[bridge.bodies.length - 1],
      pointB: { x: 25 * scale, y: 0 },
      length: 2,
      stiffness: 0.9,
    }),
  ]);

  // Set gravity
  engine.gravity.y = 1;

  const bodies = global.MatterReanimated.Composite.allBodies(engine.world);
};
