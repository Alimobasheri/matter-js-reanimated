function createCar(
  xx: number,
  yy: number,
  width: number,
  height: number,
  wheelSize: number
): MatterReanimated.Composite {
  'worklet';

  const { Body, Bodies, Composite, Constraint } = global.MatterReanimated;

  const group = Body.nextGroup(true);
  const wheelBase = 20 * (width / (150 * 0.9)); // keeps it proportional to width
  const wheelAOffset = -width * 0.5 + wheelBase;
  const wheelBOffset = width * 0.5 - wheelBase;
  const wheelYOffset = 0;

  const car = Composite.create({ label: 'Car' });

  const body = Bodies.rectangle(xx, yy, width, height, {
    collisionFilter: { group },
    chamfer: { radius: height * 0.5 },
    density: 0.0002,
  });

  const wheelA = Bodies.circle(
    xx + wheelAOffset,
    yy + wheelYOffset,
    wheelSize,
    {
      collisionFilter: { group },
      friction: 0.8,
    }
  );

  const wheelB = Bodies.circle(
    xx + wheelBOffset,
    yy + wheelYOffset,
    wheelSize,
    {
      collisionFilter: { group },
      friction: 0.8,
    }
  );

  const axelA = Constraint.create({
    bodyB: body,
    pointB: { x: wheelAOffset, y: wheelYOffset },
    bodyA: wheelA,
    stiffness: 1,
    length: 0,
  });

  const axelB = Constraint.create({
    bodyB: body,
    pointB: { x: wheelBOffset, y: wheelYOffset },
    bodyA: wheelB,
    stiffness: 1,
    length: 0,
  });

  Composite.add(car, [body, wheelA, wheelB, axelA, axelB]);

  return car;
}

export const initCar = (engine: MatterReanimated.Engine) => {
  'worklet';

  const { Composite, Bodies, Body, Constraint, World } =
    global.MatterReanimated;
  const { windowWidth, windowHeight } = global.MatterToolsReanimated;

  const scaleX = windowWidth / 800;
  const scaleY = windowHeight / 600;
  const scale = Math.min(scaleX, scaleY);

  const world = engine.world;
  engine.gravity.y = 1;

  // Add boundary walls
  World.add(world, [
    Bodies.rectangle(windowWidth / 2, 0, windowWidth, 50 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(windowWidth / 2, windowHeight, windowWidth, 50 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(windowWidth, windowHeight / 2, 50 * scale, windowHeight, {
      isStatic: true,
    }),
    Bodies.rectangle(0, windowHeight / 2, 50 * scale, windowHeight, {
      isStatic: true,
    }),
  ]);

  // Original values:
  // Car 1: (150, 100, 135, 27, 27)
  // Car 2: (350, 300, 120, 24, 24)
  const carComposite = createCar(
    150 * scaleX,
    100 * scaleY,
    135 * scale,
    27 * scale,
    27 * scale
  );

  const carComposite2 = createCar(
    350 * scaleX,
    300 * scaleY,
    120 * scale,
    24 * scale,
    24 * scale
  );

  // Original ramps:
  // (200,150,400), (500,350,650), (300,560,600)
  World.add(world, [
    carComposite,
    carComposite2,
    Bodies.rectangle(200 * scaleX, 150 * scaleY, 400 * scale, 20 * scale, {
      isStatic: true,
      angle: Math.PI * 0.06,
    }),
    Bodies.rectangle(500 * scaleX, 350 * scaleY, 650 * scale, 20 * scale, {
      isStatic: true,
      angle: -Math.PI * 0.06,
    }),
    Bodies.rectangle(300 * scaleX, 560 * scaleY, 600 * scale, 20 * scale, {
      isStatic: true,
      angle: Math.PI * 0.04,
    }),
  ]);
};
