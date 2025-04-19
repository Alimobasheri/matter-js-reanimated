declare global {
    var windowWidth: number;
    var windowHeight: number;
}

export const initAvalanche = (engine: any) => {
    'worklet';

    // Get screen dimensions from React Native
    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;

    const { Bodies, Composites, World } = global.Matter;

    // Add bodies
    // Create stack of circles with low friction and restitution
    const stack = Composites.stack(
        20,
        20,
        20,
        5,
        0,
        0,
        (x: number, y: number) => {
            return Bodies.circle(x, y, global.Matter.Common.random(10, 20), {
                friction: 0.00001,
                restitution: 0.5,
                density: 0.001,
            });
        }
    );

    World.add(engine.world, stack);

    // Add inclined platforms
    World.add(engine.world, [
        Bodies.rectangle(width * 0.25, height * 0.25, width * 0.875, 20, {
            isStatic: true,
            angle: Math.PI * 0.06,
        }),
        Bodies.rectangle(width * 0.625, height * 0.58, width * 0.875, 20, {
            isStatic: true,
            angle: -Math.PI * 0.06,
        }),
        Bodies.rectangle(width * 0.425, height * 0.97, width * 0.875, 20, {
            isStatic: true,
            angle: Math.PI * 0.04,
        }),
    ]);

    // Set gravity
    engine.gravity.y = 1;
};
