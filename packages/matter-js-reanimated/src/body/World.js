var Composite = require('./Composite');
var Common = require('../core/Common');

/**
 * This module has now been replaced by `MatterReanimated.Composite`.
 *
 * All usage should be migrated to the equivalent functions found on `MatterReanimated.Composite`.
 * For example `World.add(world, body)` now becomes `Composite.add(world, body)`.
 *
 * The property `world.gravity` has been moved to `engine.gravity`.
 *
 * For back-compatibility purposes this module will remain as a direct alias to `MatterReanimated.Composite` in the short term during migration.
 * Eventually this alias module will be marked as deprecated and then later removed in a future release.
 *
 * @class World
 */

var init = function () {
    'worklet';

    if (global.MatterReanimated && global.MatterReanimated.World) {
        return;
    }

    if (!global.MatterReanimated) {
        global.MatterReanimated = {};
    }

    global.MatterReanimated.World = {};

    var World = global.MatterReanimated.World;

    Composite();
    Common();

    /**
     * See above, aliases for back compatibility only
     */
    World.create = global.MatterReanimated.Composite.create;
    World.add = global.MatterReanimated.Composite.add;
    World.remove = global.MatterReanimated.Composite.remove;
    World.clear = global.MatterReanimated.Composite.clear;
    World.addComposite = global.MatterReanimated.Composite.addComposite;
    World.addBody = global.MatterReanimated.Composite.addBody;
    World.addConstraint = global.MatterReanimated.Composite.addConstraint;
};

module.exports = init;
