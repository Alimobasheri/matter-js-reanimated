'use worklet';
function createCar(
    xx: number,
    yy: number,
    width: number,
    height: number,
    wheelSize: number
): Matter.Composite {
    'worklet';

    const { Body, Bodies, Composite, Constraint } = global.Matter;

    const group = Body.nextGroup(true);
    const wheelBase = 20;
    const wheelAOffset = -width * 0.5 + wheelBase;
    const wheelBOffset = width * 0.5 - wheelBase;
    const wheelYOffset = 0;

    const car = Composite.create({ label: 'Car' });

    const body = Bodies.rectangle(xx, yy, width, height, {
        collisionFilter: { group },
        chamfer: { radius: height * 0.5 },
        density: 0.0002,
    });

    const wheelA = Bodies.circle(
        xx + wheelAOffset,
        yy + wheelYOffset,
        wheelSize,
        {
            collisionFilter: { group },
            friction: 0.8,
        }
    );

    const wheelB = Bodies.circle(
        xx + wheelBOffset,
        yy + wheelYOffset,
        wheelSize,
        {
            collisionFilter: { group },
            friction: 0.8,
        }
    );

    const axelA = Constraint.create({
        bodyB: body,
        pointB: { x: wheelAOffset, y: wheelYOffset },
        bodyA: wheelA,
        stiffness: 1,
        length: 0,
    });

    const axelB = Constraint.create({
        bodyB: body,
        pointB: { x: wheelBOffset, y: wheelYOffset },
        bodyA: wheelB,
        stiffness: 1,
        length: 0,
    });

    Composite.add(car, [body, wheelA, wheelB, axelA, axelB]);

    return car;
}

export const initCar = (engine: Matter.Engine) => {
    'worklet';

    const { Composite, Composites, Bodies, Body, Constraint, World } =
        global.Matter;

    const { windowWidth, windowHeight } = global;

    const world = engine.world;
    engine.gravity.y = 1;

    // Add boundary walls
    World.add(world, [
        Bodies.rectangle(windowWidth / 2, 0, windowWidth, 50, {
            isStatic: true,
        }),
        Bodies.rectangle(windowWidth / 2, windowHeight, windowWidth, 50, {
            isStatic: true,
        }),
        Bodies.rectangle(windowWidth, windowHeight / 2, 50, windowHeight, {
            isStatic: true,
        }),
        Bodies.rectangle(0, windowHeight / 2, 50, windowHeight, {
            isStatic: true,
        }),
    ]);

    const carComposite = createCar(150, 100, 150 * 0.9, 30 * 0.9, 30 * 0.9);
    const carComposite2 = createCar(350, 300, 150 * 0.8, 30 * 0.8, 30 * 0.8);

    World.add(world, [
        carComposite,
        carComposite2,
        Bodies.rectangle(200, 150, 400, 20, {
            isStatic: true,
            angle: Math.PI * 0.06,
        }),
        Bodies.rectangle(500, 350, 650, 20, {
            isStatic: true,
            angle: -Math.PI * 0.06,
        }),
        Bodies.rectangle(300, 560, 600, 20, {
            isStatic: true,
            angle: Math.PI * 0.04,
        }),
    ]);
};
