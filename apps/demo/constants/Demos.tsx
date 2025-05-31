import { initAirFriction } from '@/examples/worklets/airFriction';
import { initAvalanche } from '@/examples/worklets/avalanche';
import { initBallPool } from '@/examples/worklets/ballPool';
import { initBridge } from '@/examples/worklets/bridge';
import { initCar } from '@/examples/worklets/car';
import { initCatapult } from '@/examples/worklets/catapult';
import { initChains } from '@/examples/worklets/chains';
import { initCircleStack } from '@/examples/worklets/circleStack';
import { initCloth } from '@/examples/worklets/cloth';
import { initCollisionFiltering } from '@/examples/worklets/collisionFiltering';
import { initCompositeManipulation } from '@/examples/worklets/compositeManipulation';
import { initCompoundBodies } from '@/examples/worklets/compound';
import { initCompoundStack } from '@/examples/worklets/compoundStack';
import { initConstraints } from '@/examples/worklets/constraints';
import { initDoublePendulum } from '@/examples/worklets/doublePendulum';
import { initEvents } from '@/examples/worklets/events';
import { initFriction } from '@/examples/worklets/friction';
import { initGravity } from '@/examples/worklets/gravity';
import { initGyro } from '@/examples/worklets/gyro';
import { initManipulation } from '@/examples/worklets/manipulation';
import { initMixedShapes } from '@/examples/worklets/mixed';
import { initNewtonsCradle } from '@/examples/worklets/newtonsCradle';
import { initPyramid } from '@/examples/worklets/pyramid';
import { initRagdoll } from '@/examples/worklets/ragdoll';
import { initRestitution } from '@/examples/worklets/restitution';
import { initRoundedCorners } from '@/examples/worklets/rounded';
import { initSoftBody } from '@/examples/worklets/softBody';
import { initStaticFriction } from '@/examples/worklets/staticFriction';
import { initStress } from '@/examples/worklets/stress';
import { initStress2 } from '@/examples/worklets/stress2';
import { initStress3 } from '@/examples/worklets/stress3';
import { initStress4 } from '@/examples/worklets/stress4';
import { initTimeScale } from '@/examples/worklets/timescale';

export const DEMOS = [
  {
    id: 'air-friction',
    title: 'Air Friction',
    description: 'Demonstrates air friction effects on falling blocks',
  },
  {
    id: 'avalanche',
    title: 'Avalanche',
    description:
      'Simulates an avalanche of small particles cascading down slopes',
  },
  {
    id: 'ball-pool',
    title: 'Ball Pool',
    description: 'A pool of bouncing circles with polygonal obstacles',
  },
  {
    id: 'bridge',
    title: 'Bridge',
    description: 'A swaying bridge construction with falling blocks',
  },
  {
    id: 'car',
    title: 'Car',
    description: 'A composite car with wheels and constraints.',
  },
  {
    id: 'catapult',
    title: 'Catapult',
    description: 'A catapult with blocks and a ball',
  },
  {
    id: 'chains',
    title: 'Chains',
    description: 'Demonstrates different types of chains and constraints',
  },
  {
    id: 'circleStack',
    title: 'Circle Stack',
    description: 'A stack of circles that interact with each other',
  },
  {
    id: 'cloth',
    title: 'Cloth',
    description: 'A hanging cloth simulation with physics',
  },
  {
    id: 'collision-filtering',
    title: 'Collision Filtering',
    description: 'Demonstrates collision filtering using category bitmasks',
  },
  {
    id: 'composite-manipulation',
    title: 'Composite Manipulation',
    description: 'Demonstrates composite translation, rotation and scaling',
  },
  {
    id: 'compound-bodies',
    title: 'Compound Bodies',
    description: 'Demonstrates compound bodies made of multiple parts',
  },
  {
    id: 'compound-stack',
    title: 'Compound Stack',
    description: 'A stack of compound bodies with cross shapes',
  },
  {
    id: 'constraints',
    title: 'Constraints',
    description: 'Demonstrates various types of constraints between bodies',
  },
  {
    id: 'double-pendulum',
    title: 'Double Pendulum',
    description: 'A chaotic double pendulum system',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'Demonstrates event handling in Matter.js',
  },
  {
    id: 'friction',
    title: 'Friction',
    description: 'Demonstrates different friction coefficients',
  },
  {
    id: 'gravity',
    title: 'Gravity',
    description: 'Objects fall upwards with reversed gravity',
  },
  {
    id: 'gyro',
    title: 'Gyroscope',
    description: 'Control gravity with device orientation',
  },
  {
    id: 'manipulation',
    title: 'Manipulation',
    description: 'Demonstrates various body manipulation techniques',
  },
  {
    id: 'mixed-shapes',
    title: 'Mixed Shapes',
    description: 'A mix of different polygon shapes with random chamfering',
  },
  {
    id: 'newtonsCradle',
    title: "Newton's Cradle",
    description: 'A classic physics demonstration with swinging balls',
  },
  {
    id: 'pyramid',
    title: 'Pyramid',
    description: 'A stack of rectangular bodies arranged in a pyramid shape',
  },
  {
    id: 'ragdoll',
    title: 'Ragdoll',
    description: 'A physics-based ragdoll simulation',
  },
  {
    id: 'restitution',
    title: 'Restitution',
    description: 'Demonstrates the effect of restitution on collisions',
  },
  {
    id: 'rounded-corners',
    title: 'Rounded Corners',
    description: 'Demonstrates different chamfering options for bodies',
  },
  {
    id: 'soft-body',
    title: 'Soft Body',
    description: 'Interactive soft body physics simulation',
  },
  {
    id: 'static-friction',
    title: 'Static Friction',
    description: 'Demonstrates infinite static friction between stacked bodies',
  },
  {
    id: 'stress',
    title: 'Stress Test',
    description: 'Tests engine performance with many bodies',
  },
  {
    id: 'stress2',
    title: 'Stress Test 2',
    description: 'More intensive stress test with smaller bodies',
  },
  {
    id: 'stress3',
    title: 'Stress Test 3',
    description: 'Randomized shapes stress test',
  },
  {
    id: 'stress4',
    title: 'Stress Test 4',
    description:
      'Advanced stress test with multiple stacks and gravity effects',
  },
  {
    id: 'time-scale',
    title: 'Time Scaling',
    description: 'Demonstrates time scaling effects',
  },
];

export const examples = {
  'air-friction': initAirFriction,
  avalanche: initAvalanche,
  'ball-pool': initBallPool,
  bridge: initBridge,
  car: initCar,
  catapult: initCatapult,
  chains: initChains,
  circleStack: initCircleStack,
  cloth: initCloth,
  'collision-filtering': initCollisionFiltering,
  'composite-manipulation': initCompositeManipulation,
  'compound-bodies': initCompoundBodies,
  'compound-stack': initCompoundStack,
  constraints: initConstraints,
  'double-pendulum': initDoublePendulum,
  events: initEvents,
  friction: initFriction,
  gravity: initGravity,
  gyro: initGyro,
  manipulation: initManipulation,
  'mixed-shapes': initMixedShapes,
  newtonsCradle: initNewtonsCradle,
  pyramid: initPyramid,
  ragdoll: initRagdoll,
  restitution: initRestitution,
  'rounded-corners': initRoundedCorners,
  'soft-body': initSoftBody,
  'static-friction': initStaticFriction,
  stress: initStress,
  stress2: initStress2,
  stress3: initStress3,
  stress4: initStress4,
  'time-scale': initTimeScale,
};
