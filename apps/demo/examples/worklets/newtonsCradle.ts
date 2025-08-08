// examples/worklets/NewtonsCradle.ts
export const initNewtonsCradle = (engine: any) => {
  'worklet';

  const width = global.MatterReanimated.windowWidth || 800;
  const height = global.MatterReanimated.windowHeight || 600;
  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Body, Composite, Constraint, Bodies, Composites, World } =
    global.MatterReanimated;

  const createCradle = (
    xx: number,
    yy: number,
    number: number,
    size: number,
    length: number
  ) => {
    const cradle = Composite.create({ label: 'Newtons Cradle' });

    for (let i = 0; i < number; i++) {
      const separation = 1.9;
      const x = xx * scale + i * (size * separation * scale);
      const y = yy * scale;
      const circle = Bodies.circle(x, y + length * scale, size * scale, {
        inertia: Infinity,
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        slop: size * 0.02,
      });
      const constraint = Constraint.create({
        pointA: { x, y },
        bodyB: circle,
        length: length * scale,
        stiffness: 1,
      });

      Composite.addBody(cradle, circle);
      Composite.addConstraint(cradle, constraint);
    }

    return cradle;
  };

  const cradle1 = createCradle(280, 100, 5, 30, 200);
  Body.translate(cradle1.bodies[0], { x: -180 * scale, y: -100 * scale });
  const cradle2 = createCradle(280, 380, 7, 20, 140);
  Body.translate(cradle2.bodies[0], { x: -140 * scale, y: -100 * scale });

  World.add(engine.world, [cradle1, cradle2]);

  engine.gravity.y = 1;
};
