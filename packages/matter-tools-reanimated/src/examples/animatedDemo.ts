import Matter from 'matter-js';

export const initAniamtedDemo = (engine: Matter.Engine) => {
    'worklet';

    const width = global.windowWidth || 800;
    const height = global.windowHeight || 600;

    const scaleX = width / 800;
    const scaleY = height / 600;
    const scale = Math.min(scaleX, scaleY);

    const { Bodies, Composite, Constraint } = global.Matter;

    // add stiff global constraint
    var body = Bodies.rectangle(150 * scaleY, 200 * scaleX, width * 0.3, 60, {
        label: 'signBody',
    });

    var constraint1 = Constraint.create({
        pointA: { x: 100 * scaleX, y: 75 * scaleY },
        bodyB: body,
        pointB: { x: -(width * 0.3) / 2, y: -30 },
        stiffness: 0.001,
    });
    var constraint2 = Constraint.create({
        pointA: { x: 100 * scaleX, y: 75 * scaleY },
        bodyB: body,
        pointB: { x: (width * 0.3) / 2, y: -30 },
        stiffness: 0.001,
    });

    Composite.add(engine.world, [body, constraint1, constraint2]);

    engine.gravity.y = 1;
};
