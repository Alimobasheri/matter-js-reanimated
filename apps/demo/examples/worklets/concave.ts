// This example fails and is in progress. It requires poly-decomp to be
// installed in the react-native project. The poly-decomp library is not
// compatible with React Native, so it is not included in the
// project.

// examples/worklets/Concave.ts
declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initConcave = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, World, Vertices, Common } =
    global.MatterReanimated;

  // provide concave decomposition support library
  Common.setDecomp(global.decomp);

  // add bodies
  World.add(engine.world, [
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

  const arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50'),
    chevron = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0'),
    star = Vertices.fromPath(
      '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38'
    ),
    horseShoe = Vertices.fromPath(
      '35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7'
    );

  const stack = Composites.stack(
    50 * scale,
    50 * scale,
    6,
    4,
    10 * scale,
    10 * scale,
    function (x: number, y: number) {
      const color = Common.choose([
        '#f19648',
        '#f5d259',
        '#f55a3c',
        '#063e7b',
        '#ececd1',
      ]);
      return Bodies.fromVertices(
        x,
        y,
        Common.choose([arrow, chevron, star, horseShoe]),
        {
          render: {
            fillStyle: color,
            strokeStyle: color,
            lineWidth: 1,
          },
        },
        true
      );
    }
  );

  World.add(engine.world, stack);

  // Set gravity
  engine.gravity.y = 1;
};
