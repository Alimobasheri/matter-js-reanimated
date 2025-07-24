// examples/worklets/CollisionFiltering.ts
declare global {
  var windowWidth: number;
  var windowHeight: number;
}

export const initCollisionFiltering = (engine: any) => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);

  const { Bodies, Composites, Composite, World } = global.MatterReanimated;

  // define our categories (as bit fields, there are up to 32 available)
  const defaultCategory = 0x0001;
  const redCategory = 0x0002;
  const greenCategory = 0x0004;
  const blueCategory = 0x0008;

  // add floor
  World.add(
    engine.world,
    Bodies.rectangle(400 * scale, 600 * scale, 900 * scale, 50 * scale, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
        lineWidth: 1,
      },
    })
  );

  // create a stack with varying body categories (but these bodies can all collide with each other)
  World.add(
    engine.world,
    Composites.stack(
      275 * scale,
      100 * scale,
      5,
      9,
      10 * scale,
      10 * scale,
      (x: number, y: number, column: number, row: number) => {
        let category = redCategory;
        let color = '#f55a3c';

        if (row > 5) {
          category = blueCategory;
          color = '#063e7b';
        } else if (row > 2) {
          category = greenCategory;
          color = '#f5d259';
        }

        return Bodies.circle(x, y, 20 * scale, {
          collisionFilter: {
            category: category,
          },
          render: {
            strokeStyle: color,
            fillStyle: 'transparent',
            lineWidth: 1,
          },
        });
      }
    )
  );

  // this body will only collide with the walls and the green bodies
  World.add(
    engine.world,
    Bodies.circle(310 * scale, 40 * scale, 30 * scale, {
      collisionFilter: {
        mask: defaultCategory | greenCategory,
      },
      render: {
        fillStyle: '#f5d259',
      },
    })
  );

  // this body will only collide with the walls and the red bodies
  World.add(
    engine.world,
    Bodies.circle(400 * scale, 40 * scale, 30 * scale, {
      collisionFilter: {
        mask: defaultCategory | redCategory,
      },
      render: {
        fillStyle: '#f55a3c',
      },
    })
  );

  // this body will only collide with the walls and the blue bodies
  World.add(
    engine.world,
    Bodies.circle(480 * scale, 40 * scale, 30 * scale, {
      collisionFilter: {
        mask: defaultCategory | blueCategory,
      },
      render: {
        fillStyle: '#063e7b',
      },
    })
  );

  // Set gravity
  engine.gravity.y = 1;
};
