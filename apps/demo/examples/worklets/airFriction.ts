export const initAirFriction = (engine: any) => {
    'worklet';

    // Get screen dimensions from React Native
    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;

    const { Bodies, World } = global.Matter;

    // add bodies
    World.add(engine.world, [
        // falling blocks with different air friction
        Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
        Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
        Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.1 }),

        // walls
        Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true }),
        Bodies.rectangle(width / 2, height, width, 50, { isStatic: true }),
        Bodies.rectangle(width, height / 2, 50, height, { isStatic: true }),
        Bodies.rectangle(0, height / 2, 50, height, { isStatic: true }),
    ]);

    // Set gravity
    engine.gravity.y = 1;
};
