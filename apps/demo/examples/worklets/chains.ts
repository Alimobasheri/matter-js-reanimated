// examples/worklets/Chains.ts
export const initChains = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, Body, Constraint, World } =
    global.MatterReanimated;

  // create bodies
  var group = Body.nextGroup(true);

  var ropeA = Composites.stack(
    100 * scale,
    50 * scale,
    8,
    1,
    10 * scale,
    10 * scale,
    function (x: number, y: number) {
      return Bodies.rectangle(x, y, 50 * scale, 20 * scale, {
        collisionFilter: { group: group },
      });
    }
  );

  Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2 * scale,
    render: { type: 'line' },
  });
  Composite.add(
    ropeA,
    Constraint.create({
      bodyB: ropeA.bodies[0],
      pointB: { x: -25 * scale, y: 0 },
      pointA: {
        x: ropeA.bodies[0].position.x,
        y: ropeA.bodies[0].position.y,
      },
      stiffness: 0.5,
    })
  );

  group = Body.nextGroup(true);

  var ropeB = Composites.stack(
    350 * scale,
    50 * scale,
    10,
    1,
    10 * scale,
    10 * scale,
    function (x: number, y: number) {
      return Bodies.circle(x, y, 20 * scale, {
        collisionFilter: { group: group },
      });
    }
  );

  Composites.chain(ropeB, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2 * scale,
    render: { type: 'line' },
  });
  Composite.add(
    ropeB,
    Constraint.create({
      bodyB: ropeB.bodies[0],
      pointB: { x: -20 * scale, y: 0 },
      pointA: {
        x: ropeB.bodies[0].position.x,
        y: ropeB.bodies[0].position.y,
      },
      stiffness: 0.5,
    })
  );

  group = Body.nextGroup(true);

  var ropeC = Composites.stack(
    600 * scale,
    50 * scale,
    13,
    1,
    10 * scale,
    10 * scale,
    function (x: number, y: number) {
      return Bodies.rectangle(x - 20 * scale, y, 50 * scale, 20 * scale, {
        collisionFilter: { group: group },
        chamfer: { radius: 5 * scale },
      });
    }
  );

  Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
  Composite.add(
    ropeC,
    Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -20 * scale, y: 0 },
      pointA: {
        x: ropeC.bodies[0].position.x,
        y: ropeC.bodies[0].position.y,
      },
      stiffness: 0.5,
    })
  );

  World.add(engine.world, [
    ropeA,
    ropeB,
    ropeC,
    Bodies.rectangle(400 * scale, height - 25 * scale, width, 50.5 * scale, {
      isStatic: true,
    }),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
