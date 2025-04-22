// examples/worklets/CompositeManipulation.ts
declare global {
    var windowWidth: number;
    var windowHeight: number;
}

export const initCompositeManipulation = (engine: any) => {
    'worklet';

    // Get screen dimensions from React Native
    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;

    const scaleX = width / 800;
    const scaleY = height / 600;
    const scale = Math.min(scaleX, scaleY);

    const { Bodies, Composites, Composite, World } = global.Matter;

    // Create walls
    const walls = [
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
    ];

    // Create stack of bodies
    const stack = Composites.stack(
        200 * scale,
        200 * scale,
        4,
        4,
        0,
        0,
        (x: number, y: number) => {
            return Bodies.rectangle(x, y, 40 * scale, 40 * scale);
        }
    );

    // Add all bodies to world
    World.add(engine.world, [...walls, stack]);

    // Set gravity
    engine.gravity.y = 0;

    // Animation variables
    let time = 0;

    // Animation loop
    const animate = () => {
        'worklet';
        time += 16; // Approximate 60fps frame time

        const timeScale = 16 / 1000;

        Composite.translate(stack, {
            x: Math.sin(time * 0.001) * 10 * timeScale * scale,
            y: 0,
        });

        Composite.rotate(stack, Math.sin(time * 0.001) * 0.75 * timeScale, {
            x: 300 * scale,
            y: 300 * scale,
        });

        const scaleFactor = 1 + Math.sin(time * 0.001) * 0.75 * timeScale;
        Composite.scale(stack, scaleFactor, scaleFactor, {
            x: 300 * scale,
            y: 300 * scale,
        });

        requestAnimationFrame(animate);
    };

    animate();
};
