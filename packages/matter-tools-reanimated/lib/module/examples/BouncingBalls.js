export const initBouncingBalls = engine => {
  'worklet';

  // Get screen dimensions from React Native
  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  // Add ground - positioned at bottom of screen
  const ground = global.Matter.Bodies.rectangle(width / 2, height - 30, width, 60, {
    isStatic: true
  });

  // Add walls - positioned at edges of screen
  const leftWall = global.Matter.Bodies.rectangle(0, height / 2, 60, height, {
    isStatic: true
  });
  const rightWall = global.Matter.Bodies.rectangle(width, height / 2, 60, height, {
    isStatic: true
  });

  // Add 200 random balls
  const balls = Array(100).fill(0).map((_, i) => {
    const radius = 15 + Math.random() * 15;
    return global.Matter.Bodies.circle(100 + Math.random() * (width - 200),
    // Keep balls away from edges
    100 + i * 5, radius, {
      restitution: 0.8,
      friction: 0.001,
      frictionAir: 0.0001
    });
  });

  // Add all bodies to world
  global.Matter.World.add(engine.world, [ground, leftWall, rightWall, ...balls]);

  // Set gravity
  engine.gravity.y = 1;
};
//# sourceMappingURL=BouncingBalls.js.map