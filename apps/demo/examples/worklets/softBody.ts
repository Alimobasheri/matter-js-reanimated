// examples/worklets/softBody.ts
declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initSoftBody = (engine: any) => {
  'worklet';

  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;
  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, World } = global.MatterReanimated;

  const particleOptions = {
    friction: 0.05,
    frictionStatic: 0.1,
    render: { visible: true },
    inertia: Infinity,
  };

  const constraintOptions = {
    stiffness: 0.2,
    render: { type: 'line', anchors: false },
  };

  const createSoftBody = (
    xx: number,
    yy: number,
    columns: number,
    rows: number,
    columnGap: number,
    rowGap: number,
    crossBrace: boolean,
    particleRadius: number
  ) => {
    const softBody = Composites.stack(
      xx * scale,
      yy * scale,
      columns,
      rows,
      columnGap * scale,
      rowGap * scale,
      (x: number, y: number) => {
        return Bodies.circle(x, y, particleRadius * scale, particleOptions);
      }
    );

    Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);
    return softBody;
  };

  World.add(engine.world, [
    createSoftBody(250, 100, 5, 5, 0, 0, true, 18),
    createSoftBody(400, 300, 8, 3, 0, 0, true, 15),
    createSoftBody(250, 400, 4, 4, 0, 0, true, 15),
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

  engine.gravity.y = 1;
};
