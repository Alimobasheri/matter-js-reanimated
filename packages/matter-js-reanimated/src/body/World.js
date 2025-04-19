var Composite = require('./Composite');
var Common = require('../core/Common');

/**
 * This module has now been replaced by `Matter.Composite`.
 *
 * All usage should be migrated to the equivalent functions found on `Matter.Composite`.
 * For example `World.add(world, body)` now becomes `Composite.add(world, body)`.
 *
 * The property `world.gravity` has been moved to `engine.gravity`.
 *
 * For back-compatibility purposes this module will remain as a direct alias to `Matter.Composite` in the short term during migration.
 * Eventually this alias module will be marked as deprecated and then later removed in a future release.
 *
 * @class World
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.World) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.World = {};

    var World = global.Matter.World;

    Composite();
    Common();

    /**
     * See above, aliases for back compatibility only
     */
    World.create = global.Matter.Composite.create;
    World.add = global.Matter.Composite.add;
    World.remove = global.Matter.Composite.remove;
    World.clear = global.Matter.Composite.clear;
    World.addComposite = global.Matter.Composite.addComposite;
    World.addBody = global.Matter.Composite.addBody;
    World.addConstraint = global.Matter.Composite.addConstraint;
};

module.exports = init;
