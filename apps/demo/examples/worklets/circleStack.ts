// examples/worklets/CircleStack.ts
declare global {
    var windowWidth: number;
    var windowHeight: number;
}

export const initCircleStack = (engine: any) => {
    'worklet';

    // Get screen dimensions from React Native
    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;

    const scaleX = width / 800;
    const scaleY = height / 600;
    const scale = Math.min(scaleX, scaleY);

    const { Bodies, Composites, Composite, World } = global.Matter;

    // Create stack of circles
    const stack = Composites.stack(
        100 * scale,
        height - 21 * scale - 20 * 20 * scale,
        10,
        10,
        20 * scale,
        0,
        (x: number, y: number) => {
            return Bodies.circle(x, y, 20 * scale);
        }
    );

    // Add all bodies to world
    World.add(engine.world, [
        // walls
        Bodies.rectangle(width / 2, 0, width, 50 * scale, { isStatic: true }),
        Bodies.rectangle(width / 2, height, width, 50 * scale, {
            isStatic: true,
        }),
        Bodies.rectangle(width, height / 2, 50 * scale, height, {
            isStatic: true,
        }),
        Bodies.rectangle(0, height / 2, 50 * scale, height, { isStatic: true }),
        stack,
    ]);

    // Set gravity
    engine.gravity.y = 1;
};
