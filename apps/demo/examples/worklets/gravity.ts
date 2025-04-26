// examples/worklets/ReverseGravity.ts
export const initGravity = (engine: any) => {
    'worklet';

    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;
    const scaleX = width / 800;
    const scaleY = height / 600;
    const scale = Math.min(scaleX, scaleY);

    const { Bodies, Composites, Composite, World } = global.Matter;

    // add bodies
    World.add(engine.world, [
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

    engine.gravity.y = -1;

    const stack = Composites.stack(
        50 * scale,
        120 * scale,
        11,
        5,
        0,
        0,
        function (x: number, y: number) {
            switch (Math.round(global.Matter.Common.random(0, 1))) {
                case 0:
                    if (global.Matter.Common.random() < 0.8) {
                        return Bodies.rectangle(
                            x,
                            y,
                            global.Matter.Common.random(20, 50) * scale,
                            global.Matter.Common.random(20, 50) * scale
                        );
                    } else {
                        return Bodies.rectangle(
                            x,
                            y,
                            global.Matter.Common.random(80, 120) * scale,
                            global.Matter.Common.random(20, 30) * scale
                        );
                    }
                case 1:
                    return Bodies.polygon(
                        x,
                        y,
                        Math.round(global.Matter.Common.random(1, 8)),
                        global.Matter.Common.random(20, 50) * scale
                    );
            }
        }
    );

    World.add(engine.world, stack);
};
