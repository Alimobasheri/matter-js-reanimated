export const initDoublePendulum = (engine: any) => {
  'worklet';

  const width = global.MatterReanimated.windowWidth || 800;
  const height = global.MatterReanimated.windowHeight || 600;
  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, Body, Constraint, World, Vector } =
    global.MatterReanimated;

  const group = Body.nextGroup(true);
  const length = 200 * scale;
  const widthSize = 25 * scale;

  const pendulum = Composites.stack(
    350 * scale,
    160 * scale,
    2,
    1,
    -20 * scale,
    0,
    (x: number, y: number) => {
      return Bodies.rectangle(x, y, length, widthSize, {
        collisionFilter: { group },
        frictionAir: 0,
        chamfer: { radius: 5 * scale },
        render: {
          fillStyle: 'transparent',
          lineWidth: 1,
        },
      });
    }
  );

  engine.gravity.scale = 0.002;

  Composites.chain(pendulum, 0.45, 0, -0.45, 0, {
    stiffness: 0.9,
    length: 0,
    angularStiffness: 0.7,
    render: {
      strokeStyle: '#4a485b',
    },
  });

  Composite.add(
    pendulum,
    Constraint.create({
      bodyB: pendulum.bodies[0],
      pointB: { x: -length * 0.42, y: 0 },
      pointA: {
        x: pendulum.bodies[0].position.x - length * 0.42,
        y: pendulum.bodies[0].position.y,
      },
      stiffness: 0.9,
      length: 0,
      render: {
        strokeStyle: '#4a485b',
      },
    })
  );

  const lowerArm = pendulum.bodies[1];
  //@ts-ignore
  Body.rotate(lowerArm, -Math.PI * 0.3, {
    x: lowerArm.position.x - 100 * scale,
    y: lowerArm.position.y,
  });

  World.add(engine.world, pendulum);
};
