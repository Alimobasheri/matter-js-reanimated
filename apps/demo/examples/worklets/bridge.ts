declare global {
    var windowWidth: number;
    var windowHeight: number;
}

export const initBridge = (engine: any) => {
    'worklet';

    // Get screen dimensions from React Native
    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;

    const { Bodies, Composites, Composite, Body, Constraint, World } =
        global.Matter;

    // Create group for bridge pieces
    const group = Body.nextGroup(true);

    // Create bridge segments
    const bridge = Composites.stack(
        width * 0.2,
        height * 0.5,
        15,
        1,
        0,
        0,
        (x: number, y: number) => {
            return Bodies.rectangle(x - 20, y, 53, 20, {
                collisionFilter: {
                    group,
                },
                chamfer: { radius: 5 },
                density: 0.005,
                frictionAir: 0.05,
            });
        }
    );

    // Chain bridge segments together
    Composites.chain(bridge, 0.3, 0, -0.3, 0, {
        stiffness: 0.99,
        length: 0.0001,
    });

    // Create a stack of blocks to fall onto the bridge
    const stack = Composites.stack(
        width * 0.3,
        height * 0.1,
        6,
        3,
        0,
        0,
        (x: number, y: number) => {
            return Bodies.rectangle(x, y, 50, 50);
        }
    );

    // Add all bodies to world
    World.add(engine.world, [
        bridge,
        stack,
        // Left wall
        Bodies.rectangle(
            width * 0.05,
            height * 0.8,
            width * 0.25,
            height * 0.6,
            {
                isStatic: true,
                chamfer: { radius: 20 },
            }
        ),
        // Right wall
        Bodies.rectangle(
            width * 0.95,
            height * 0.8,
            width * 0.25,
            height * 0.6,
            {
                isStatic: true,
                chamfer: { radius: 20 },
            }
        ),
        // Left bridge support
        Constraint.create({
            pointA: { x: width * 0.2, y: height * 0.5 },
            bodyB: bridge.bodies[0],
            pointB: { x: -25, y: 0 },
            length: 2,
            stiffness: 0.9,
        }),
        // Right bridge support
        Constraint.create({
            pointA: { x: width * 0.8, y: height * 0.5 },
            bodyB: bridge.bodies[bridge.bodies.length - 1],
            pointB: { x: 25, y: 0 },
            length: 2,
            stiffness: 0.9,
        }),
    ]);

    // Set gravity
    engine.gravity.y = 1;

    const bodies = global.Matter.Composite.allBodies(engine.world);
    console.log(
        '🚀 ~ initBridge ~ bodies:',
        bodies.map((b) => b.collisionFilter)
    );
};
