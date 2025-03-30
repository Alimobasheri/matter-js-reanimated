var Matter = require('../core/Matter');

var Axes = require('../geometry/Axes');
var Bodies = require('../factory/Bodies');
var Body = require('../body/Body');
var Bounds = require('../geometry/Bounds');
var Collision = require('../collision/Collision');
var Common = require('../core/Common');
var Composite = require('../body/Composite');
var Composites = require('../factory/Composites');
var Constraint = require('../constraint/Constraint');
var Contact = require('../collision/Contact');
var Detector = require('../collision/Detector');
var Engine = require('../core/Engine');
var Events = require('../core/Events');
var Pair = require('../collision/Pair');
var Pairs = require('../collision/Pairs');
var Plugin = require('../core/Plugin');
var Query = require('../collision/Query');
var Resolver = require('../collision/Resolver');
var Sleeping = require('../core/Sleeping');
var Vector = require('../geometry/Vector');
var Vertices = require('../geometry/Vertices');
var World = require('../body/World');

// // temporary back compatibility
// Matter.Engine.run = Matter.Runner.run;
// Matter.Common.deprecated(
//     Matter.Engine,
//     'run',
//     'Engine.run ➤ use Matter.Runner.run(engine) instead'
// );

var initMatter = function () {
    'worklet';
    Matter();
    Axes();
    Bodies();
    Body();
    Bounds();
    Collision();
    Common();
    Composite();
    Composites();
    Constraint();
    Contact();
    Detector();
    Engine();
    Events();
    Pair();
    Pairs();
    Plugin();
    Query();
    Resolver();
    Sleeping();
    Vector();
    Vertices();
    World();
};

module.exports = initMatter;
