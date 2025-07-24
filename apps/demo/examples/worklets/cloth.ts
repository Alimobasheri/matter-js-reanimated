function createCloth(
  xx: number,
  yy: number,
  columns: number,
  rows: number,
  columnGap: number,
  rowGap: number,
  crossBrace: boolean,
  particleRadius: number,
  particleOptions: MatterReanimated.IBodyDefinition = {},
  constraintOptions: any = {}
) {
  'worklet';
  const { Bodies, Composites, Body, Common } = global.MatterReanimated;

  const group = Body.nextGroup(true);
  particleOptions = Common.extend(
    {
      inertia: Infinity,
      friction: 0.00001,
      collisionFilter: { group },
      render: { visible: false },
    },
    //@ts-ignore
    particleOptions
  );

  constraintOptions = Common.extend(
    {
      stiffness: 0.06,
      render: { type: 'line', anchors: false },
    },
    constraintOptions
  );

  const cloth = Composites.stack(
    xx,
    yy,
    columns,
    rows,
    columnGap,
    rowGap,
    (x: number, y: number) => {
      return Bodies.circle(x, y, particleRadius, particleOptions);
    }
  );

  Composites.mesh(cloth, columns, rows, crossBrace, constraintOptions);
  cloth.label = 'Cloth Body';

  return cloth;
}

export const initCloth = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, Body, World } =
    global.MatterReanimated;

  // Create cloth
  const cloth = createCloth(
    200 * scale,
    200 * scale,
    20,
    12,
    5 * scale,
    5 * scale,
    false,
    8 * scale
  );

  // Make first row static
  for (let i = 0; i < 20; i++) {
    cloth.bodies[i].isStatic = true;
  }

  // Add all bodies to world
  World.add(engine.world, [
    cloth,
    Bodies.circle(300 * scale, 500 * scale, 80 * scale, { isStatic: true }),
    Bodies.rectangle(500 * scale, 480 * scale, 80 * scale, 80 * scale, {
      isStatic: true,
    }),
    Bodies.rectangle(400 * scale, 609 * scale, 800 * scale, 50 * scale, {
      isStatic: true,
    }),
  ]);

  // Set gravity
  engine.gravity.y = 1;
};
