// examples/worklets/Ragdoll.ts
declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initRagdoll = (engine: any) => {
  'worklet';

  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;
  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composite, Composites, Constraint, World, Body } =
    global.MatterReanimated;

  const createRagdoll = (x: number, y: number, scale: number) => {
    const head = Bodies.rectangle(x, y - 60 * scale, 34 * scale, 40 * scale, {
      label: 'head',
      collisionFilter: { group: Body.nextGroup(true) },
      chamfer: {
        radius: [15 * scale, 15 * scale, 15 * scale, 15 * scale],
      },
    });

    const chest = Bodies.rectangle(x, y, 55 * scale, 80 * scale, {
      label: 'chest',
      collisionFilter: { group: Body.nextGroup(true) },
      chamfer: {
        radius: [20 * scale, 20 * scale, 26 * scale, 26 * scale],
      },
    });

    const rightUpperArm = Bodies.rectangle(
      x + 39 * scale,
      y - 15 * scale,
      20 * scale,
      40 * scale,
      {
        label: 'right-arm',
        collisionFilter: { group: Body.nextGroup(true) },
        chamfer: { radius: 10 * scale },
      }
    );

    const rightLowerArm = Bodies.rectangle(
      x + 39 * scale,
      y + 25 * scale,
      20 * scale,
      60 * scale,
      {
        label: 'right-arm',
        collisionFilter: { group: Body.nextGroup(true) },
        chamfer: { radius: 10 * scale },
      }
    );

    const leftUpperArm = Bodies.rectangle(
      x - 39 * scale,
      y - 15 * scale,
      20 * scale,
      40 * scale,
      {
        label: 'left-arm',
        collisionFilter: { group: Body.nextGroup(true) },
        chamfer: { radius: 10 * scale },
      }
    );

    const leftLowerArm = Bodies.rectangle(
      x - 39 * scale,
      y + 25 * scale,
      20 * scale,
      60 * scale,
      {
        label: 'left-arm',
        collisionFilter: { group: Body.nextGroup(true) },
        chamfer: { radius: 10 * scale },
      }
    );

    const leftUpperLeg = Bodies.rectangle(
      x - 20 * scale,
      y + 57 * scale,
      20 * scale,
      40 * scale,
      {
        label: 'left-leg',
        collisionFilter: { group: Body.nextGroup(true) },
        chamfer: { radius: 10 * scale },
      }
    );

    const leftLowerLeg = Bodies.rectangle(
      x - 20 * scale,
      y + 97 * scale,
      20 * scale,
      60 * scale,
      {
        label: 'left-leg',
        collisionFilter: { group: Body.nextGroup(true) },
        chamfer: { radius: 10 * scale },
      }
    );

    const rightUpperLeg = Bodies.rectangle(
      x + 20 * scale,
      y + 57 * scale,
      20 * scale,
      40 * scale,
      {
        label: 'right-leg',
        collisionFilter: { group: Body.nextGroup(true) },
        chamfer: { radius: 10 * scale },
      }
    );

    const rightLowerLeg = Bodies.rectangle(
      x + 20 * scale,
      y + 97 * scale,
      20 * scale,
      60 * scale,
      {
        label: 'right-leg',
        collisionFilter: { group: Body.nextGroup(true) },
        chamfer: { radius: 10 * scale },
      }
    );

    const constraints = [
      Constraint.create({
        bodyA: chest,
        pointA: { x: 24 * scale, y: -23 * scale },
        pointB: { x: 0, y: -8 * scale },
        bodyB: rightUpperArm,
        stiffness: 0.6,
      }),
      Constraint.create({
        bodyA: chest,
        pointA: { x: -24 * scale, y: -23 * scale },
        pointB: { x: 0, y: -8 * scale },
        bodyB: leftUpperArm,
        stiffness: 0.6,
      }),
      Constraint.create({
        bodyA: chest,
        pointA: { x: -10 * scale, y: 30 * scale },
        pointB: { x: 0, y: -10 * scale },
        bodyB: leftUpperLeg,
        stiffness: 0.6,
      }),
      Constraint.create({
        bodyA: chest,
        pointA: { x: 10 * scale, y: 30 * scale },
        pointB: { x: 0, y: -10 * scale },
        bodyB: rightUpperLeg,
        stiffness: 0.6,
      }),
      Constraint.create({
        bodyA: rightUpperArm,
        bodyB: rightLowerArm,
        pointA: { x: 0, y: 15 * scale },
        pointB: { x: 0, y: -25 * scale },
        stiffness: 0.6,
      }),
      Constraint.create({
        bodyA: leftUpperArm,
        bodyB: leftLowerArm,
        pointA: { x: 0, y: 15 * scale },
        pointB: { x: 0, y: -25 * scale },
        stiffness: 0.6,
      }),
      Constraint.create({
        bodyA: leftUpperLeg,
        bodyB: leftLowerLeg,
        pointA: { x: 0, y: 20 * scale },
        pointB: { x: 0, y: -20 * scale },
        stiffness: 0.6,
      }),
      Constraint.create({
        bodyA: rightUpperLeg,
        bodyB: rightLowerLeg,
        pointA: { x: 0, y: 20 * scale },
        pointB: { x: 0, y: -20 * scale },
        stiffness: 0.6,
      }),
      Constraint.create({
        bodyA: head,
        pointA: { x: 0, y: 25 * scale },
        pointB: { x: 0, y: -35 * scale },
        bodyB: chest,
        stiffness: 0.6,
      }),
      Constraint.create({
        bodyA: leftLowerLeg,
        bodyB: rightLowerLeg,
        stiffness: 0.01,
      }),
    ];

    return Composite.create({
      bodies: [
        chest,
        head,
        leftLowerArm,
        leftUpperArm,
        rightLowerArm,
        rightUpperArm,
        leftLowerLeg,
        rightLowerLeg,
        leftUpperLeg,
        rightUpperLeg,
      ],
      constraints,
    });
  };

  const ragdoll = createRagdoll(200 * scale, 100 * scale, 1.3 * scale);

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

  World.add(engine.world, [
    ragdoll,
    stack,
    Bodies.rectangle(400 * scale, 600 * scale, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
  ]);

  engine.gravity.y = 1;
};
