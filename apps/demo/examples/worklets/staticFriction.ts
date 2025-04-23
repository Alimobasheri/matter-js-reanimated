export const initStaticFriction = (engine: any) => {
    'worklet';

    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;
    const scaleX = width / 800;
    const scaleY = height / 600;
    const scale = Math.min(scaleX, scaleY);

    const { Bodies, Composites, Composite, Body, World, Events } =
        global.Matter;

    const body = Bodies.rectangle(
        400 * scale,
        500 * scale,
        200 * scale,
        60 * scale,
        {
            isStatic: true,
            chamfer: { radius: 10 * scale },
            render: { fillStyle: '#060a19' },
        }
    );

    const size = 50 * scale;
    const stack = Composites.stack(
        350 * scale,
        470 * scale - 6 * size,
        1,
        6,
        0,
        0,
        (x: number, y: number) => {
            return Bodies.rectangle(x, y, size * 2, size, {
                slop: 0.5,
                friction: 1,
                frictionStatic: Infinity,
            });
        }
    );

    World.add(engine.world, [
        body,
        stack,
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

    Events.on(engine, 'beforeUpdate', function () {
        if (engine.timing.timestamp < 1500) {
            return;
        }

        const px =
            400 * scale +
            100 * scale * Math.sin((engine.timing.timestamp - 1500) * 0.001);
        Body.setPosition(body, { x: px, y: body.position.y }, true);
    });
};
