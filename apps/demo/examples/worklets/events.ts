// examples/worklets/Events.ts
declare global {
    var windowWidth: number;
    var windowHeight: number;
}

export const initEvents = (engine: any) => {
    'worklet';

    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;
    const scaleX = width / 800;
    const scaleY = height / 600;
    const scale = Math.min(scaleX, scaleY);

    const { Bodies, Composites, Composite, Body, Events, Common, World } =
        global.Matter;

    // Set up event listeners
    Events.on(engine.world, 'afterAdd', function (event: any) {
        // Handle afterAdd event
    });

    let lastTime = Common.now();

    Events.on(engine, 'beforeUpdate', function (event: any) {
        const engine = event.source;

        if (Common.now() - lastTime >= 5000) {
            const bodies = Composite.allBodies(engine.world);
            const timeScale = 1000 / 60 / engine.timing.lastDelta;

            for (let i = 0; i < bodies.length; i++) {
                const body = bodies[i];
                if (!body.isStatic && body.position.y >= 500 * scale) {
                    const forceMagnitude = 0.03 * body.mass * timeScale;
                    Body.applyForce(body, body.position, {
                        x:
                            (forceMagnitude +
                                Common.random() * forceMagnitude) *
                            Common.choose([1, -1]),
                        y: -forceMagnitude + Common.random() * -forceMagnitude,
                    });
                }
            }
            lastTime = Common.now();
        }
    });

    Events.on(engine, 'collisionStart', function (event: any) {
        const pairs = event.pairs;
        // Handle collision start
    });

    Events.on(engine, 'collisionActive', function (event: any) {
        const pairs = event.pairs;
        // Handle active collision
    });

    Events.on(engine, 'collisionEnd', function (event: any) {
        const pairs = event.pairs;
        // Handle collision end
    });

    // Create bodies
    const bodyStyle = { fillStyle: '#222' };
    const stack = Composites.stack(
        70 * scale,
        100 * scale,
        9,
        4,
        50 * scale,
        50 * scale,
        (x: number, y: number) => {
            return Bodies.circle(x, y, 15 * scale, {
                restitution: 1,
                render: bodyStyle,
            });
        }
    );

    World.add(engine.world, [
        stack,
        Bodies.rectangle(400 * scale, 0, 800 * scale, 50 * scale, {
            isStatic: true,
            render: bodyStyle,
        }),
        Bodies.rectangle(400 * scale, 600 * scale, 800 * scale, 50 * scale, {
            isStatic: true,
            render: bodyStyle,
        }),
        Bodies.rectangle(800 * scale, 300 * scale, 50 * scale, 600 * scale, {
            isStatic: true,
            render: bodyStyle,
        }),
        Bodies.rectangle(0, 300 * scale, 50 * scale, 600 * scale, {
            isStatic: true,
            render: bodyStyle,
        }),
    ]);

    engine.gravity.y = 1;
};
