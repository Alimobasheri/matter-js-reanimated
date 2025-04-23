export const initMixedShapes = (engine: any) => {
    'worklet';

    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;
    const scaleX = width / 800;
    const scaleY = height / 600;
    const scale = Math.min(scaleX, scaleY);

    const { Engine, Composites, Composite, Bodies, World } = global.Matter;

    // add bodies
    const stack = Composites.stack(
        20 * scale,
        20 * scale,
        10,
        5,
        0,
        0,
        (x: number, y: number) => {
            const sides = Math.round(global.Matter.Common.random(1, 8));

            let chamfer = { radius: 0 };
            if (sides > 2 && global.Matter.Common.random() > 0.7) {
                chamfer = {
                    radius: 10 * scale,
                };
            }

            switch (Math.round(global.Matter.Common.random(0, 1))) {
                case 0:
                    if (global.Matter.Common.random() < 0.8) {
                        return Bodies.rectangle(
                            x,
                            y,
                            global.Matter.Common.random(25, 50) * scale,
                            global.Matter.Common.random(25, 50) * scale,
                            { chamfer: chamfer }
                        );
                    } else {
                        return Bodies.rectangle(
                            x,
                            y,
                            global.Matter.Common.random(80, 120) * scale,
                            global.Matter.Common.random(25, 30) * scale,
                            { chamfer: chamfer }
                        );
                    }
                case 1:
                    return Bodies.polygon(
                        x,
                        y,
                        sides,
                        global.Matter.Common.random(25, 50) * scale,
                        { chamfer: chamfer }
                    );
            }
        }
    );

    World.add(engine.world, [
        stack,
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

    engine.gravity.y = 1;
};
