var Composite = require('../body/Composite');
var Constraint = require('../constraint/Constraint');
var Common = require('../core/Common');
var Body = require('../body/Body');
var Bodies = require('./Bodies');

/**
 * The `Matter.Composites` module contains factory methods for creating composite bodies
 * with commonly used configurations (such as stacks and chains).
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Composites
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Composites) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Composites = {};

    var Composites = global.Matter.Composites;

    Composite();
    Constraint();
    Common();
    Body();
    Bodies();

    var deprecated = global.Matter.Common.deprecated;

    /**
     * Create a new composite containing bodies created in the callback in a grid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method stack
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.stack = function (
        x,
        y,
        columns,
        rows,
        columnGap,
        rowGap,
        callback
    ) {
        var stack = global.Matter.Composite.create({ label: 'Stack' }),
            currentX = x,
            currentY = y,
            lastBody,
            i = 0;

        for (var row = 0; row < rows; row++) {
            var maxHeight = 0;

            for (var column = 0; column < columns; column++) {
                var body = callback(
                    currentX,
                    currentY,
                    column,
                    row,
                    lastBody,
                    i
                );

                if (body) {
                    var bodyHeight = body.bounds.max.y - body.bounds.min.y,
                        bodyWidth = body.bounds.max.x - body.bounds.min.x;

                    if (bodyHeight > maxHeight) maxHeight = bodyHeight;

                    global.Matter.Body.translate(body, {
                        x: bodyWidth * 0.5,
                        y: bodyHeight * 0.5,
                    });

                    currentX = body.bounds.max.x + columnGap;

                    global.Matter.Composite.addBody(stack, body);

                    lastBody = body;
                    i += 1;
                } else {
                    currentX += columnGap;
                }
            }

            currentY += maxHeight + rowGap;
            currentX = x;
        }

        return stack;
    };

    /**
     * Chains all bodies in the given composite together using constraints.
     * @method chain
     * @param {composite} composite
     * @param {number} xOffsetA
     * @param {number} yOffsetA
     * @param {number} xOffsetB
     * @param {number} yOffsetB
     * @param {object} options
     * @return {composite} A new composite containing objects chained together with constraints
     */
    Composites.chain = function (
        composite,
        xOffsetA,
        yOffsetA,
        xOffsetB,
        yOffsetB,
        options
    ) {
        var bodies = composite.bodies;

        for (var i = 1; i < bodies.length; i++) {
            var bodyA = bodies[i - 1],
                bodyB = bodies[i],
                bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y,
                bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x,
                bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y,
                bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;

            var defaults = {
                bodyA: bodyA,
                pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                bodyB: bodyB,
                pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB },
            };

            var constraint = global.Matter.Common.extend(defaults, options);

            global.Matter.Composite.addConstraint(
                composite,
                global.Matter.Constraint.create(constraint)
            );
        }

        composite.label += ' Chain';

        return composite;
    };

    /**
     * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
     * @method mesh
     * @param {composite} composite
     * @param {number} columns
     * @param {number} rows
     * @param {boolean} crossBrace
     * @param {object} options
     * @return {composite} The composite containing objects meshed together with constraints
     */
    Composites.mesh = function (composite, columns, rows, crossBrace, options) {
        var bodies = composite.bodies,
            row,
            col,
            bodyA,
            bodyB,
            bodyC;

        for (row = 0; row < rows; row++) {
            for (col = 1; col < columns; col++) {
                bodyA = bodies[col - 1 + row * columns];
                bodyB = bodies[col + row * columns];
                global.Matter.Composite.addConstraint(
                    composite,
                    global.Matter.Constraint.create(
                        global.Matter.Common.extend(
                            { bodyA: bodyA, bodyB: bodyB },
                            options
                        )
                    )
                );
            }

            if (row > 0) {
                for (col = 0; col < columns; col++) {
                    bodyA = bodies[col + (row - 1) * columns];
                    bodyB = bodies[col + row * columns];
                    global.Matter.Composite.addConstraint(
                        composite,
                        global.Matter.Constraint.create(
                            global.Matter.Common.extend(
                                { bodyA: bodyA, bodyB: bodyB },
                                options
                            )
                        )
                    );

                    if (crossBrace && col > 0) {
                        bodyC = bodies[col - 1 + (row - 1) * columns];
                        global.Matter.Composite.addConstraint(
                            composite,
                            global.Matter.Constraint.create(
                                global.Matter.Common.extend(
                                    { bodyA: bodyC, bodyB: bodyB },
                                    options
                                )
                            )
                        );
                    }

                    if (crossBrace && col < columns - 1) {
                        bodyC = bodies[col + 1 + (row - 1) * columns];
                        global.Matter.Composite.addConstraint(
                            composite,
                            global.Matter.Constraint.create(
                                global.Matter.Common.extend(
                                    { bodyA: bodyC, bodyB: bodyB },
                                    options
                                )
                            )
                        );
                    }
                }
            }
        }

        composite.label += ' Mesh';

        return composite;
    };

    /**
     * Create a new composite containing bodies created in the callback in a pyramid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method pyramid
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.pyramid = function (
        x,
        y,
        columns,
        rows,
        columnGap,
        rowGap,
        callback
    ) {
        return Composites.stack(
            x,
            y,
            columns,
            rows,
            columnGap,
            rowGap,
            function (stackX, stackY, column, row, lastBody, i) {
                var actualRows = Math.min(rows, Math.ceil(columns / 2)),
                    lastBodyWidth = lastBody
                        ? lastBody.bounds.max.x - lastBody.bounds.min.x
                        : 0;

                if (row > actualRows) return;

                // reverse row order
                row = actualRows - row;

                var start = row,
                    end = columns - 1 - row;

                if (column < start || column > end) return;

                // retroactively fix the first body's position, since width was unknown
                if (i === 1) {
                    global.Matter.Body.translate(lastBody, {
                        x:
                            (column + (columns % 2 === 1 ? 1 : -1)) *
                            lastBodyWidth,
                        y: 0,
                    });
                }

                var xOffset = lastBody ? column * lastBodyWidth : 0;

                return callback(
                    x + xOffset + column * columnGap,
                    stackY,
                    column,
                    row,
                    lastBody,
                    i
                );
            }
        );
    };

    /**
     * This has now moved to the [newtonsCradle example](https://github.com/liabru/matter-js/blob/master/examples/newtonsCradle.js), follow that instead as this function is deprecated here.
     * @deprecated moved to newtonsCradle example
     * @method newtonsCradle
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} number
     * @param {number} size
     * @param {number} length
     * @return {composite} A new composite newtonsCradle body
     */
    Composites.newtonsCradle = function (x, y, number, size, length) {
        var newtonsCradle = global.Matter.Composite.create({
            label: 'Newtons Cradle',
        });

        for (var i = 0; i < number; i++) {
            var separation = 1.9,
                circle = global.Matter.Bodies.circle(
                    x + i * (size * separation),
                    y + length,
                    size,
                    {
                        inertia: Infinity,
                        restitution: 1,
                        friction: 0,
                        frictionAir: 0.0001,
                        slop: 1,
                    }
                ),
                constraint = global.Matter.Constraint.create({
                    pointA: { x: x + i * (size * separation), y: y },
                    bodyB: circle,
                });

            global.Matter.Composite.addBody(newtonsCradle, circle);
            global.Matter.Composite.addConstraint(newtonsCradle, constraint);
        }

        return newtonsCradle;
    };

    deprecated(
        Composites,
        'newtonsCradle',
        'Composites.newtonsCradle ➤ moved to newtonsCradle example'
    );

    /**
     * This has now moved to the [car example](https://github.com/liabru/matter-js/blob/master/examples/car.js), follow that instead as this function is deprecated here.
     * @deprecated moved to car example
     * @method car
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} width
     * @param {number} height
     * @param {number} wheelSize
     * @return {composite} A new composite car body
     */
    Composites.car = function (x, y, width, height, wheelSize) {
        var group = global.Matter.Body.nextGroup(true),
            wheelBase = 20,
            wheelAOffset = -width * 0.5 + wheelBase,
            wheelBOffset = width * 0.5 - wheelBase,
            wheelYOffset = 0;

        var car = global.Matter.Composite.create({ label: 'Car' }),
            body = global.Matter.Bodies.rectangle(x, y, width, height, {
                collisionFilter: {
                    group: group,
                },
                chamfer: {
                    radius: height * 0.5,
                },
                density: 0.0002,
            });

        var wheelA = global.Matter.Bodies.circle(
            x + wheelAOffset,
            y + wheelYOffset,
            wheelSize,
            {
                collisionFilter: {
                    group: group,
                },
                friction: 0.8,
            }
        );

        var wheelB = global.Matter.Bodies.circle(
            x + wheelBOffset,
            y + wheelYOffset,
            wheelSize,
            {
                collisionFilter: {
                    group: group,
                },
                friction: 0.8,
            }
        );

        var axelA = global.Matter.Constraint.create({
            bodyB: body,
            pointB: { x: wheelAOffset, y: wheelYOffset },
            bodyA: wheelA,
            stiffness: 1,
            length: 0,
        });

        var axelB = global.Matter.Constraint.create({
            bodyB: body,
            pointB: { x: wheelBOffset, y: wheelYOffset },
            bodyA: wheelB,
            stiffness: 1,
            length: 0,
        });

        global.Matter.Composite.addBody(car, body);
        global.Matter.Composite.addBody(car, wheelA);
        global.Matter.Composite.addBody(car, wheelB);
        global.Matter.Composite.addConstraint(car, axelA);
        global.Matter.Composite.addConstraint(car, axelB);

        return car;
    };

    deprecated(Composites, 'car', 'Composites.car ➤ moved to car example');

    /**
     * This has now moved to the [softBody example](https://github.com/liabru/matter-js/blob/master/examples/softBody.js)
     * and the [cloth example](https://github.com/liabru/matter-js/blob/master/examples/cloth.js), follow those instead as this function is deprecated here.
     * @deprecated moved to softBody and cloth examples
     * @method softBody
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {boolean} crossBrace
     * @param {number} particleRadius
     * @param {} particleOptions
     * @param {} constraintOptions
     * @return {composite} A new composite softBody
     */
    Composites.softBody = function (
        x,
        y,
        columns,
        rows,
        columnGap,
        rowGap,
        crossBrace,
        particleRadius,
        particleOptions,
        constraintOptions
    ) {
        particleOptions = global.Matter.Common.extend(
            { inertia: Infinity },
            particleOptions
        );
        constraintOptions = global.Matter.Common.extend(
            { stiffness: 0.2, render: { type: 'line', anchors: false } },
            constraintOptions
        );

        var softBody = Composites.stack(
            x,
            y,
            columns,
            rows,
            columnGap,
            rowGap,
            function (stackX, stackY) {
                return global.Matter.Bodies.circle(
                    stackX,
                    stackY,
                    particleRadius,
                    particleOptions
                );
            }
        );

        Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);

        softBody.label = 'Soft Body';

        return softBody;
    };

    deprecated(
        Composites,
        'softBody',
        'Composites.softBody ➤ moved to softBody and cloth examples'
    );
};

module.exports = init;
