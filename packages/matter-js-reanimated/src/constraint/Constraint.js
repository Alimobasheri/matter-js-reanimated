var Vertices = require('../geometry/Vertices');
var Vector = require('../geometry/Vector');
var Sleeping = require('../core/Sleeping');
var Bounds = require('../geometry/Bounds');
var Axes = require('../geometry/Axes');
var Common = require('../core/Common');

/**
 * The `Matter.Constraint` module contains methods for creating and manipulating constraints.
 * Constraints are used for specifying that a fixed distance must be maintained between two bodies (or a body and a fixed world-space position).
 * The stiffness of constraints can be modified to create springs or elastic.
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Constraint
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Constraint) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Constraint = {};

    var Constraint = global.Matter.Constraint;

    Vertices();
    Vector();
    Sleeping();
    Bounds();
    Axes();
    Common();

    Constraint._warming = 0.4;
    Constraint._torqueDampen = 1;
    Constraint._minLength = 0.000001;

    /**
     * Creates a new constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * To simulate a revolute constraint (or pin joint) set `length: 0` and a high `stiffness` value (e.g. `0.7` or above).
     * If the constraint is unstable, try lowering the `stiffness` value and / or increasing `engine.constraintIterations`.
     * For compound bodies, constraints must be applied to the parent body (not one of its parts).
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {constraint} constraint
     */
    Constraint.create = function (options) {
        var constraint = options;

        // if bodies defined but no points, use body centre
        if (constraint.bodyA && !constraint.pointA)
            constraint.pointA = { x: 0, y: 0 };
        if (constraint.bodyB && !constraint.pointB)
            constraint.pointB = { x: 0, y: 0 };

        // calculate static length using initial world space points
        var initialPointA = constraint.bodyA
                ? global.Matter.Vector.add(
                      constraint.bodyA.position,
                      constraint.pointA
                  )
                : constraint.pointA,
            initialPointB = constraint.bodyB
                ? global.Matter.Vector.add(
                      constraint.bodyB.position,
                      constraint.pointB
                  )
                : constraint.pointB,
            length = global.Matter.Vector.magnitude(
                global.Matter.Vector.sub(initialPointA, initialPointB)
            );

        constraint.length =
            typeof constraint.length !== 'undefined'
                ? constraint.length
                : length;

        // option defaults
        constraint.id = constraint.id || global.Matter.Common.nextId();
        constraint.label = constraint.label || 'Constraint';
        constraint.type = 'constraint';
        constraint.stiffness =
            constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
        constraint.damping = constraint.damping || 0;
        constraint.angularStiffness = constraint.angularStiffness || 0;
        constraint.angleA = constraint.bodyA
            ? constraint.bodyA.angle
            : constraint.angleA;
        constraint.angleB = constraint.bodyB
            ? constraint.bodyB.angle
            : constraint.angleB;
        constraint.plugin = {};

        // render
        var render = {
            visible: true,
            lineWidth: 2,
            strokeStyle: '#ffffff',
            type: 'line',
            anchors: true,
        };

        if (constraint.length === 0 && constraint.stiffness > 0.1) {
            render.type = 'pin';
            render.anchors = false;
        } else if (constraint.stiffness < 0.9) {
            render.type = 'spring';
        }

        constraint.render = global.Matter.Common.extend(
            render,
            constraint.render
        );

        return constraint;
    };

    /**
     * Prepares for solving by constraint warming.
     * @private
     * @method preSolveAll
     * @param {body[]} bodies
     */
    Constraint.preSolveAll = function (bodies) {
        for (var i = 0; i < bodies.length; i += 1) {
            var body = bodies[i],
                impulse = body.constraintImpulse;

            if (
                body.isStatic ||
                (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)
            ) {
                continue;
            }

            body.position.x += impulse.x;
            body.position.y += impulse.y;
            body.angle += impulse.angle;
        }
    };

    /**
     * Solves all constraints in a list of collisions.
     * @private
     * @method solveAll
     * @param {constraint[]} constraints
     * @param {number} delta
     */
    Constraint.solveAll = function (constraints, delta) {
        var timeScale = global.Matter.Common.clamp(
            delta / global.Matter.Common._baseDelta,
            0,
            1
        );

        // Solve fixed constraints first.
        for (var i = 0; i < constraints.length; i += 1) {
            var constraint = constraints[i],
                fixedA =
                    !constraint.bodyA ||
                    (constraint.bodyA && constraint.bodyA.isStatic),
                fixedB =
                    !constraint.bodyB ||
                    (constraint.bodyB && constraint.bodyB.isStatic);

            if (fixedA || fixedB) {
                Constraint.solve(constraints[i], timeScale);
            }
        }

        // Solve free constraints last.
        for (i = 0; i < constraints.length; i += 1) {
            constraint = constraints[i];
            fixedA =
                !constraint.bodyA ||
                (constraint.bodyA && constraint.bodyA.isStatic);
            fixedB =
                !constraint.bodyB ||
                (constraint.bodyB && constraint.bodyB.isStatic);

            if (!fixedA && !fixedB) {
                Constraint.solve(constraints[i], timeScale);
            }
        }
    };

    /**
     * Solves a distance constraint with Gauss-Siedel method.
     * @private
     * @method solve
     * @param {constraint} constraint
     * @param {number} timeScale
     */
    Constraint.solve = function (constraint, timeScale) {
        var bodyA = constraint.bodyA,
            bodyB = constraint.bodyB,
            pointA = constraint.pointA,
            pointB = constraint.pointB;

        if (!bodyA && !bodyB) return;

        // update reference angle
        if (bodyA && !bodyA.isStatic) {
            global.Matter.Vector.rotate(
                pointA,
                bodyA.angle - constraint.angleA,
                pointA
            );
            constraint.angleA = bodyA.angle;
        }

        // update reference angle
        if (bodyB && !bodyB.isStatic) {
            global.Matter.Vector.rotate(
                pointB,
                bodyB.angle - constraint.angleB,
                pointB
            );
            constraint.angleB = bodyB.angle;
        }

        var pointAWorld = pointA,
            pointBWorld = pointB;

        if (bodyA)
            pointAWorld = global.Matter.Vector.add(bodyA.position, pointA);
        if (bodyB)
            pointBWorld = global.Matter.Vector.add(bodyB.position, pointB);

        if (!pointAWorld || !pointBWorld) return;

        var delta = global.Matter.Vector.sub(pointAWorld, pointBWorld),
            currentLength = global.Matter.Vector.magnitude(delta);

        // prevent singularity
        if (currentLength < Constraint._minLength) {
            currentLength = Constraint._minLength;
        }

        // solve distance constraint with Gauss-Siedel method
        var difference = (currentLength - constraint.length) / currentLength,
            isRigid = constraint.stiffness >= 1 || constraint.length === 0,
            stiffness = isRigid
                ? constraint.stiffness * timeScale
                : constraint.stiffness * timeScale * timeScale,
            damping = constraint.damping * timeScale,
            force = global.Matter.Vector.mult(delta, difference * stiffness),
            massTotal =
                (bodyA ? bodyA.inverseMass : 0) +
                (bodyB ? bodyB.inverseMass : 0),
            inertiaTotal =
                (bodyA ? bodyA.inverseInertia : 0) +
                (bodyB ? bodyB.inverseInertia : 0),
            resistanceTotal = massTotal + inertiaTotal,
            torque,
            share,
            normal,
            normalVelocity,
            relativeVelocity;

        if (damping > 0) {
            var zero = global.Matter.Vector.create();
            normal = global.Matter.Vector.div(delta, currentLength);

            relativeVelocity = global.Matter.Vector.sub(
                (bodyB &&
                    global.Matter.Vector.sub(
                        bodyB.position,
                        bodyB.positionPrev
                    )) ||
                    zero,
                (bodyA &&
                    global.Matter.Vector.sub(
                        bodyA.position,
                        bodyA.positionPrev
                    )) ||
                    zero
            );

            normalVelocity = global.Matter.Vector.dot(normal, relativeVelocity);
        }

        if (bodyA && !bodyA.isStatic) {
            share = bodyA.inverseMass / massTotal;

            // keep track of applied impulses for post solving
            bodyA.constraintImpulse.x -= force.x * share;
            bodyA.constraintImpulse.y -= force.y * share;

            // apply forces
            bodyA.position.x -= force.x * share;
            bodyA.position.y -= force.y * share;

            // apply damping
            if (damping > 0) {
                bodyA.positionPrev.x -=
                    damping * normal.x * normalVelocity * share;
                bodyA.positionPrev.y -=
                    damping * normal.y * normalVelocity * share;
            }

            // apply torque
            torque =
                (global.Matter.Vector.cross(pointA, force) / resistanceTotal) *
                Constraint._torqueDampen *
                bodyA.inverseInertia *
                (1 - constraint.angularStiffness);
            bodyA.constraintImpulse.angle -= torque;
            bodyA.angle -= torque;
        }

        if (bodyB && !bodyB.isStatic) {
            share = bodyB.inverseMass / massTotal;

            // keep track of applied impulses for post solving
            bodyB.constraintImpulse.x += force.x * share;
            bodyB.constraintImpulse.y += force.y * share;

            // apply forces
            bodyB.position.x += force.x * share;
            bodyB.position.y += force.y * share;

            // apply damping
            if (damping > 0) {
                bodyB.positionPrev.x +=
                    damping * normal.x * normalVelocity * share;
                bodyB.positionPrev.y +=
                    damping * normal.y * normalVelocity * share;
            }

            // apply torque
            torque =
                (global.Matter.Vector.cross(pointB, force) / resistanceTotal) *
                Constraint._torqueDampen *
                bodyB.inverseInertia *
                (1 - constraint.angularStiffness);
            bodyB.constraintImpulse.angle += torque;
            bodyB.angle += torque;
        }
    };

    /**
     * Performs body updates required after solving constraints.
     * @private
     * @method postSolveAll
     * @param {body[]} bodies
     */
    Constraint.postSolveAll = function (bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                impulse = body.constraintImpulse;

            if (
                body.isStatic ||
                (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)
            ) {
                continue;
            }

            global.Matter.Sleeping.set(body, false);

            // update geometry and reset
            for (var j = 0; j < body.parts.length; j++) {
                var part = body.parts[j];

                global.Matter.Vertices.translate(part.vertices, impulse);

                if (j > 0) {
                    part.position.x += impulse.x;
                    part.position.y += impulse.y;
                }

                if (impulse.angle !== 0) {
                    global.Matter.Vertices.rotate(
                        part.vertices,
                        impulse.angle,
                        body.position
                    );
                    global.Matter.Axes.rotate(part.axes, impulse.angle);
                    if (j > 0) {
                        global.Matter.Vector.rotateAbout(
                            part.position,
                            impulse.angle,
                            body.position,
                            part.position
                        );
                    }
                }

                global.Matter.Bounds.update(
                    part.bounds,
                    part.vertices,
                    body.velocity
                );
            }

            // dampen the cached impulse for warming next step
            impulse.angle *= Constraint._warming;
            impulse.x *= Constraint._warming;
            impulse.y *= Constraint._warming;
        }
    };

    /**
     * Returns the world-space position of `constraint.pointA`, accounting for `constraint.bodyA`.
     * @method pointAWorld
     * @param {constraint} constraint
     * @returns {vector} the world-space position
     */
    Constraint.pointAWorld = function (constraint) {
        return {
            x:
                (constraint.bodyA ? constraint.bodyA.position.x : 0) +
                (constraint.pointA ? constraint.pointA.x : 0),
            y:
                (constraint.bodyA ? constraint.bodyA.position.y : 0) +
                (constraint.pointA ? constraint.pointA.y : 0),
        };
    };

    /**
     * Returns the world-space position of `constraint.pointB`, accounting for `constraint.bodyB`.
     * @method pointBWorld
     * @param {constraint} constraint
     * @returns {vector} the world-space position
     */
    Constraint.pointBWorld = function (constraint) {
        return {
            x:
                (constraint.bodyB ? constraint.bodyB.position.x : 0) +
                (constraint.pointB ? constraint.pointB.x : 0),
            y:
                (constraint.bodyB ? constraint.bodyB.position.y : 0) +
                (constraint.pointB ? constraint.pointB.y : 0),
        };
    };

    /**
     * Returns the current length of the constraint.
     * This is the distance between both of the constraint's end points.
     * See `constraint.length` for the target rest length.
     * @method currentLength
     * @param {constraint} constraint
     * @returns {number} the current length
     */
    Constraint.currentLength = function (constraint) {
        var pointAX =
            (constraint.bodyA ? constraint.bodyA.position.x : 0) +
            (constraint.pointA ? constraint.pointA.x : 0);

        var pointAY =
            (constraint.bodyA ? constraint.bodyA.position.y : 0) +
            (constraint.pointA ? constraint.pointA.y : 0);

        var pointBX =
            (constraint.bodyB ? constraint.bodyB.position.x : 0) +
            (constraint.pointB ? constraint.pointB.x : 0);

        var pointBY =
            (constraint.bodyB ? constraint.bodyB.position.y : 0) +
            (constraint.pointB ? constraint.pointB.y : 0);

        var deltaX = pointAX - pointBX;
        var deltaY = pointAY - pointBY;

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    };

    /*
     *
     *  Properties Documentation
     *
     */

    /**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Constraint"
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the constraint should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * A `Number` that defines the line width to use when rendering the constraint outline.
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 2
     */

    /**
     * A `String` that defines the stroke style to use when rendering the constraint outline.
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the constraint rendering type.
     * The possible values are 'line', 'pin', 'spring'.
     * An appropriate render type will be automatically chosen unless one is given in options.
     *
     * @property render.type
     * @type string
     * @default 'line'
     */

    /**
     * A `Boolean` that defines if the constraint's anchor points should be rendered.
     *
     * @property render.anchors
     * @type boolean
     * @default true
     */

    /**
     * The first possible `Body` that this constraint is attached to.
     *
     * @property bodyA
     * @type body
     * @default null
     */

    /**
     * The second possible `Body` that this constraint is attached to.
     *
     * @property bodyB
     * @type body
     * @default null
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
     *
     * @property pointA
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyB` if defined, otherwise a world-space position.
     *
     * @property pointB
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
     * A value of `1` means the constraint should be very stiff.
     * A value of `0.2` means the constraint acts like a soft spring.
     *
     * @property stiffness
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the damping of the constraint,
     * i.e. the amount of resistance applied to each body based on their velocities to limit the amount of oscillation.
     * Damping will only be apparent when the constraint also has a very low `stiffness`.
     * A value of `0.1` means the constraint will apply heavy damping, resulting in little to no oscillation.
     * A value of `0` means the constraint will apply no damping.
     *
     * @property damping
     * @type number
     * @default 0
     */

    /**
     * A `Number` that specifies the target resting length of the constraint.
     * It is calculated automatically in `Constraint.create` from initial positions of the `constraint.bodyA` and `constraint.bodyB`.
     *
     * @property length
     * @type number
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */
};

module.exports = init;
