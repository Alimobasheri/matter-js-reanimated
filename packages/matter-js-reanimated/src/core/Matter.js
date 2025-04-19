var Plugin = require('./Plugin');
var Common = require('./Common');

var init = function () {
    'worklet';

    if (global.Matter) {
        return;
    }

    global.Matter = {};
    Plugin();
    Common();

    /**
     * The library name.
     * @property name
     * @readOnly
     * @type {String}
     */
    global.Matter.name = 'matter-js';

    /**
     * The library version.
     * @property version
     * @readOnly
     * @type {String}
     */
    global.Matter.version =
        typeof __MATTER_VERSION__ !== 'undefined' ? __MATTER_VERSION__ : '*';

    /**
     * A list of plugin dependencies to be installed.
     * @property uses
     * @type {Array}
     */
    global.Matter.uses = [];

    /**
     * The plugins that have been installed.
     * @property used
     * @readOnly
     * @type {Array}
     */
    global.Matter.used = [];

    /**
     * Installs plugins on the `Matter` namespace.
     * @method use
     * @param {...Function} plugins The plugins to install
     */
    global.Matter.use = function () {
        global.Matter.Plugin.use(
            global.Matter,
            Array.prototype.slice.call(arguments)
        );
    };

    /**
     * Chains a function to execute before the original function.
     * @method before
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    global.Matter.before = function (path, func) {
        path = path.replace(/^Matter./, '');
        return global.Matter.Common.chainPathBefore(global.Matter, path, func);
    };

    /**
     * Chains a function to execute after the original function.
     * @method after
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    global.Matter.after = function (path, func) {
        path = path.replace(/^Matter./, '');
        return global.Matter.Common.chainPathAfter(global.Matter, path, func);
    };
};

module.exports = init;
