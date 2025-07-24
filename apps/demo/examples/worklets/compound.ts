// examples/worklets/CompoundBodies.ts
declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initCompoundBodies = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Body, Constraint, Composite, World } =
    global.MatterReanimated;

  // Create first compound body (cross shape)
  const sizeA = 200 * scale;
  const xA = 200 * scale;
  const yA = 200 * scale;
  const partA = Bodies.rectangle(xA, yA, sizeA, sizeA / 5);
  const partB = Bodies.rectangle(xA, yA, sizeA / 5, sizeA, {
    render: partA.render,
  });

  const compoundBodyA = Body.create({
    parts: [partA, partB],
  });

  // Create second compound body (square of circles)
  const sizeB = 150 * scale;
  const xB = 400 * scale;
  const yB = 300 * scale;
  const partC = Bodies.circle(xB, yB, 30 * scale);
  const partD = Bodies.circle(xB + sizeB, yB, 30 * scale);
  const partE = Bodies.circle(xB + sizeB, yB + sizeB, 30 * scale);
  const partF = Bodies.circle(xB, yB + sizeB, 30 * scale);

  const compoundBodyB = Body.create({
    parts: [partC, partD, partE, partF],
  });

  // Create constraint for second compound body
  const constraint = Constraint.create({
    pointA: { x: 400 * scale, y: 100 * scale },
    bodyB: compoundBodyB,
    pointB: { x: 0, y: 0 },
  });

  // Add all bodies to world
  World.add(engine.world, [
    compoundBodyA,
    compoundBodyB,
    constraint,
    Bodies.rectangle(400 * scale, 600 * scale, 800 * scale, 50.5 * scale, {
      isStatic: true,
    }),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
