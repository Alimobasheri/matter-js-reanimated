"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initConstraints = void 0;
const initConstraints = engine => {
  'worklet';

  const width = global.MatterReanimated.windowWidth || 800;
  const height = global.MatterReanimated.windowHeight || 600;
  const scaleX = width / 800;
  const scaleY = height / 600;
  const scale = Math.min(scaleX, scaleY);
  const {
    Bodies,
    Composite,
    Constraint
  } = global.MatterReanimated;

  // add stiff global constraint
  var body = Bodies.polygon(150 * scale, 200 * scale, 5, 30 * scale);
  var constraint = Constraint.create({
    pointA: {
      x: 150 * scale,
      y: 100 * scale
    },
    bodyB: body,
    pointB: {
      x: -10 * scale,
      y: -10 * scale
    }
  });

  // add soft global constraint
  var body2 = Bodies.polygon(280 * scale, 100 * scale, 3, 30 * scale);
  var constraint2 = Constraint.create({
    pointA: {
      x: 280 * scale,
      y: 120 * scale
    },
    bodyB: body2,
    pointB: {
      x: -10 * scale,
      y: -7 * scale
    },
    stiffness: 0.001
  });

  // add damped soft global constraint
  var body3 = Bodies.polygon(400 * scale, 100 * scale, 4, 30 * scale);
  var constraint3 = Constraint.create({
    pointA: {
      x: 400 * scale,
      y: 120 * scale
    },
    bodyB: body3,
    pointB: {
      x: -10 * scale,
      y: -10 * scale
    },
    stiffness: 0.001,
    damping: 0.05
  });

  // add revolute constraint
  var body4 = Bodies.rectangle(600 * scale, 200 * scale, 200 * scale, 20 * scale);
  var ball = Bodies.circle(550 * scale, 150 * scale, 20 * scale);
  var constraint4 = Constraint.create({
    pointA: {
      x: 600 * scale,
      y: 200 * scale
    },
    bodyB: body4,
    length: 0
  });

  // add revolute multi-body constraint
  var body5 = Bodies.rectangle(500 * scale, 400 * scale, 100 * scale, 20 * scale, {
    collisionFilter: {
      group: -1
    }
  });
  var ball2 = Bodies.circle(600 * scale, 400 * scale, 20 * scale, {
    collisionFilter: {
      group: -1
    }
  });
  var constraint5 = Constraint.create({
    bodyA: body5,
    bodyB: ball2
  });

  // add stiff multi-body constraint
  var bodyA = Bodies.polygon(100 * scale, 400 * scale, 6, 20 * scale);
  var bodyB = Bodies.polygon(200 * scale, 400 * scale, 1, 50 * scale);
  var constraint6 = Constraint.create({
    bodyA: bodyA,
    pointA: {
      x: -10 * scale,
      y: -10 * scale
    },
    bodyB: bodyB,
    pointB: {
      x: -10 * scale,
      y: -10 * scale
    }
  });

  // add soft global constraint
  var bodyA2 = Bodies.polygon(300 * scale, 400 * scale, 4, 20 * scale);
  var bodyB2 = Bodies.polygon(400 * scale, 400 * scale, 3, 30 * scale);
  var constraint7 = Constraint.create({
    bodyA: bodyA2,
    pointA: {
      x: -10 * scale,
      y: -10 * scale
    },
    bodyB: bodyB2,
    pointB: {
      x: -10 * scale,
      y: -7 * scale
    },
    stiffness: 0.001
  });

  // add damped soft global constraint
  var bodyA3 = Bodies.polygon(500 * scale, 400 * scale, 6, 30 * scale);
  var bodyB3 = Bodies.polygon(600 * scale, 400 * scale, 7, 60 * scale);
  var constraint8 = Constraint.create({
    bodyA: bodyA3,
    pointA: {
      x: -10 * scale,
      y: -10 * scale
    },
    bodyB: bodyB3,
    pointB: {
      x: -10 * scale,
      y: -10 * scale
    },
    stiffness: 0.001,
    damping: 0.1
  });

  // walls
  const walls = [Bodies.rectangle(400 * scale, 0, 800 * scale, 50 * scale, {
    isStatic: true
  }), Bodies.rectangle(400 * scale, 600 * scale, 800 * scale, 50 * scale, {
    isStatic: true
  }), Bodies.rectangle(800 * scale, 300 * scale, 50 * scale, 600 * scale, {
    isStatic: true
  }), Bodies.rectangle(0, 300 * scale, 50 * scale, 600 * scale, {
    isStatic: true
  })];
  Composite.add(engine.world, [body, constraint, body2, constraint2, body3, constraint3, body4, ball, constraint4, body5, ball2, constraint5, bodyA, bodyB, constraint6, bodyA2, bodyB2, constraint7, bodyA3, bodyB3, constraint8, ...walls]);
  engine.gravity.y = 1;
};
exports.initConstraints = initConstraints;
//# sourceMappingURL=constraints.js.map