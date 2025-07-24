declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initRestitution = (engine: any) => {
  'worklet';

  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;
  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composite, World } = global.MatterReanimated;

  const rest = 0.9;
  const space = (600 / 5) * scale;

  World.add(engine.world, [
    Bodies.rectangle(
      100 * scale + space * 0,
      150 * scale,
      50 * scale,
      50 * scale,
      { restitution: rest }
    ),
    Bodies.rectangle(
      100 * scale + space * 1,
      150 * scale,
      50 * scale,
      50 * scale,
      { restitution: rest, angle: -Math.PI * 0.15 }
    ),
    Bodies.rectangle(
      100 * scale + space * 2,
      150 * scale,
      50 * scale,
      50 * scale,
      { restitution: rest, angle: -Math.PI * 0.25 }
    ),
    Bodies.circle(100 * scale + space * 3, 150 * scale, 25 * scale, {
      restitution: rest,
    }),
    Bodies.rectangle(
      100 * scale + space * 5,
      150 * scale,
      180 * scale,
      20 * scale,
      { restitution: rest, angle: -Math.PI * 0.5 }
    ),
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
