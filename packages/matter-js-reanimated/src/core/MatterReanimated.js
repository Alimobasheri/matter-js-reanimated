var Plugin = require('./Plugin');
var Common = require('./Common');

var init = function () {
    'worklet';

    if (global.MatterReanimated) {
        return;
    }

    global.MatterReanimated = {};
    global.Matter = global.MatterReanimated;
    Plugin();
    Common();

    /**
     * The library name.
     * @property name
     * @readOnly
     * @type {String}
     */
    global.MatterReanimated.name = 'matter-js';

    /**
     * The library version.
     * @property version
     * @readOnly
     * @type {String}
     */
    global.MatterReanimated.version =
        typeof __MATTER_VERSION__ !== 'undefined' ? __MATTER_VERSION__ : '*';

    /**
     * A list of plugin dependencies to be installed.
     * @property uses
     * @type {Array}
     */
    global.MatterReanimated.uses = [];

    /**
     * The plugins that have been installed.
     * @property used
     * @readOnly
     * @type {Array}
     */
    global.MatterReanimated.used = [];

    /**
     * Installs plugins on the `MatterReanimated` namespace.
     * @method use
     * @param {...Function} plugins The plugins to install
     */
    global.MatterReanimated.use = function () {
        global.MatterReanimated.Plugin.use(
            global.MatterReanimated,
            Array.prototype.slice.call(arguments)
        );
    };

    /**
     * Chains a function to execute before the original function.
     * @method before
     * @param {string} path The path relative to `MatterReanimated`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    global.MatterReanimated.before = function (path, func) {
        path = path.replace(/^MatterReanimated./, '');
        return global.MatterReanimated.Common.chainPathBefore(
            global.MatterReanimated,
            path,
            func
        );
    };

    /**
     * Chains a function to execute after the original function.
     * @method after
     * @param {string} path The path relative to `MatterReanimated`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    global.MatterReanimated.after = function (path, func) {
        path = path.replace(/^MatterReanimated./, '');
        return global.MatterReanimated.Common.chainPathAfter(
            global.MatterReanimated,
            path,
            func
        );
    };
};

module.exports = init;
