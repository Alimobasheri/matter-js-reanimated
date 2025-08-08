// examples/worklets/Manipulation.ts
export const initManipulation = (engine: any) => {
  'worklet';

  const width = global.MatterReanimated.windowWidth || 800;
  const height = global.MatterReanimated.windowHeight || 600;
  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Engine, Body, Composite, Bodies, Events } = global.MatterReanimated;

  // create bodies
  const bodyA = Bodies.rectangle(
    100 * scale,
    300 * scale,
    50 * scale,
    50 * scale,
    { isStatic: true, render: { fillStyle: '#060a19' } }
  );
  const bodyB = Bodies.rectangle(
    200 * scale,
    200 * scale,
    50 * scale,
    50 * scale
  );
  const bodyC = Bodies.rectangle(
    300 * scale,
    200 * scale,
    50 * scale,
    50 * scale
  );
  const bodyD = Bodies.rectangle(
    400 * scale,
    200 * scale,
    50 * scale,
    50 * scale
  );
  const bodyE = Bodies.rectangle(
    550 * scale,
    200 * scale,
    50 * scale,
    50 * scale
  );
  const bodyF = Bodies.rectangle(
    700 * scale,
    200 * scale,
    50 * scale,
    50 * scale
  );
  const bodyG = Bodies.circle(400 * scale, 100 * scale, 25 * scale, {
    render: { fillStyle: '#060a19' },
  });

  // add compound body
  const partA = Bodies.rectangle(
    600 * scale,
    200 * scale,
    120 * 0.8 * scale,
    50 * 0.8 * scale,
    { render: { fillStyle: '#060a19' } }
  );
  const partB = Bodies.rectangle(
    660 * scale,
    200 * scale,
    50 * 0.8 * scale,
    190 * 0.8 * scale,
    { render: { fillStyle: '#060a19' } }
  );
  const compound = Body.create({
    parts: [partA, partB],
    isStatic: true,
  });

  Body.setPosition(compound, { x: 600 * scale, y: 300 * scale });

  Composite.add(engine.world, [
    bodyA,
    bodyB,
    bodyC,
    bodyD,
    bodyE,
    bodyF,
    bodyG,
    compound,
  ]);

  Composite.add(engine.world, [
    // walls
    Bodies.rectangle(400 * scale, 0, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(400 * scale, 600 * scale, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(800 * scale, 300 * scale, 50 * scale, 600 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(0, 300 * scale, 50 * scale, 600 * scale, {
      isStatic: true,
    }),
  ]);

  let lastTime = 0;
  let scaleRate = 0.6;

  Events.on(engine, 'beforeUpdate', function (event: any) {
    const timeScale = (event.delta || 1000 / 60) / 1000;

    if (scaleRate > 0) {
      Body.scale(bodyF, 1 + scaleRate * timeScale, 1 + scaleRate * timeScale);

      // modify bodyE vertices
      bodyE.vertices[0].x -= 0.2 * timeScale;
      bodyE.vertices[0].y -= 0.2 * timeScale;
      bodyE.vertices[1].x += 0.2 * timeScale;
      bodyE.vertices[1].y -= 0.2 * timeScale;
      Body.setVertices(bodyE, bodyE.vertices);
    }

    // make bodyA move up and down
    const py =
      300 * scale + 100 * scale * Math.sin(engine.timing.timestamp * 0.002);

    // move body and update velocity
    //@ts-ignore
    Body.setPosition(bodyA, { x: 100 * scale, y: py }, true);

    // move compound body move up and down and update velocity
    //@ts-ignore
    Body.setPosition(compound, { x: 600 * scale, y: py }, true);

    // rotate compound body and update angular velocity
    //@ts-ignore
    Body.rotate(compound, 1 * Math.PI * timeScale, null, true);

    // after first 0.8 sec (simulation time)
    if (engine.timing.timestamp >= 800) Body.setStatic(bodyG, true);

    // every 1.5 sec (simulation time)
    if (engine.timing.timestamp - lastTime >= 1500) {
      Body.setVelocity(bodyB, { x: 0, y: -10 });
      Body.setAngle(bodyC, -Math.PI * 0.26);
      Body.setAngularVelocity(bodyD, 0.2);

      scaleRate = 0;
      lastTime = engine.timing.timestamp;
    }
  });

  engine.gravity.y = 1;
};
