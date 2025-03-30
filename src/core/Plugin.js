var Common = require('./Common');

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Plugin) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Plugin = {};

    Common();

    var Plugin = global.Matter.Plugin;

    Plugin._registry = {};

    /**
     * Registers a plugin object so it can be resolved later by name.
     * @method register
     * @param plugin {} The plugin to register.
     * @return {object} The plugin.
     */
    Plugin.register = function (plugin) {
        if (!Plugin.isPlugin(plugin)) {
            global.Matter.Common.warn(
                'Plugin.register:',
                Plugin.toString(plugin),
                'does not implement all required fields.'
            );
        }

        if (plugin.name in Plugin._registry) {
            var registered = Plugin._registry[plugin.name],
                pluginVersion = Plugin.versionParse(plugin.version).number,
                registeredVersion = Plugin.versionParse(
                    registered.version
                ).number;

            if (pluginVersion > registeredVersion) {
                global.Matter.Common.warn(
                    'Plugin.register:',
                    Plugin.toString(registered),
                    'was upgraded to',
                    Plugin.toString(plugin)
                );
                Plugin._registry[plugin.name] = plugin;
            } else if (pluginVersion < registeredVersion) {
                global.Matter.Common.warn(
                    'Plugin.register:',
                    Plugin.toString(registered),
                    'cannot be downgraded to',
                    Plugin.toString(plugin)
                );
            } else if (plugin !== registered) {
                global.Matter.Common.warn(
                    'Plugin.register:',
                    Plugin.toString(plugin),
                    'is already registered to a different plugin object'
                );
            }
        } else {
            Plugin._registry[plugin.name] = plugin;
        }

        return plugin;
    };

    /**
     * Resolves a dependency to a plugin object from the registry if it exists.
     * @method resolve
     * @param dependency {string} The dependency.
     * @return {object} The plugin if resolved, otherwise `undefined`.
     */
    Plugin.resolve = function (dependency) {
        return Plugin._registry[Plugin.dependencyParse(dependency).name];
    };

    /**
     * Returns a pretty printed plugin name and version.
     * @method toString
     * @param plugin {} The plugin.
     * @return {string} Pretty printed plugin name and version.
     */
    Plugin.toString = function (plugin) {
        return typeof plugin === 'string'
            ? plugin
            : (plugin.name || 'anonymous') +
                  '@' +
                  (plugin.version || plugin.range || '0.0.0');
    };

    /**
     * Returns `true` if the object meets the minimum standard to be considered a plugin.
     * @method isPlugin
     * @param obj {} The object to test.
     * @return {boolean} `true` if the object is a plugin, otherwise `false`.
     */
    Plugin.isPlugin = function (obj) {
        return obj && obj.name && obj.version && obj.install;
    };

    /**
     * Returns `true` if a plugin with the given `name` has been installed on `module`.
     * @method isUsed
     * @param module {} The module.
     * @param name {string} The plugin name.
     * @return {boolean} `true` if installed, otherwise `false`.
     */
    Plugin.isUsed = function (module, name) {
        return module.used.indexOf(name) > -1;
    };

    /**
     * Returns `true` if `plugin.for` is applicable to `module`.
     * @method isFor
     * @param plugin {} The plugin.
     * @param module {} The module.
     * @return {boolean} `true` if applicable, otherwise `false`.
     */
    Plugin.isFor = function (plugin, module) {
        var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
        return (
            !plugin.for ||
            (module.name === parsed.name &&
                Plugin.versionSatisfies(module.version, parsed.range))
        );
    };

    /**
     * Installs the specified plugins on `module`.
     * @method use
     * @param module {} The module.
     * @param [plugins=module.uses] {} The plugins to install.
     */
    Plugin.use = function (module, plugins) {
        module.uses = (module.uses || []).concat(plugins || []);

        if (module.uses.length === 0) {
            global.Matter.Common.warn(
                'Plugin.use:',
                Plugin.toString(module),
                'does not specify any dependencies to install.'
            );
            return;
        }

        var dependencies = Plugin.dependencies(module),
            sortedDependencies =
                global.Matter.Common.topologicalSort(dependencies),
            status = [];

        for (var i = 0; i < sortedDependencies.length; i++) {
            if (sortedDependencies[i] === module.name) {
                continue;
            }

            var plugin = Plugin.resolve(sortedDependencies[i]);

            if (!plugin) {
                status.push('❌ ' + sortedDependencies[i]);
                continue;
            }

            if (Plugin.isUsed(module, plugin.name)) {
                continue;
            }

            if (!Plugin.isFor(plugin, module)) {
                global.Matter.Common.warn(
                    'Plugin.use:',
                    Plugin.toString(plugin),
                    'is for',
                    plugin.for,
                    'but installed on',
                    Plugin.toString(module) + '.'
                );
                plugin._warned = true;
            }

            if (plugin.install) {
                plugin.install(module);
            } else {
                global.Matter.Common.warn(
                    'Plugin.use:',
                    Plugin.toString(plugin),
                    'does not specify an install function.'
                );
                plugin._warned = true;
            }

            status.push(
                plugin._warned
                    ? '🔶 ' + Plugin.toString(plugin)
                    : '✅ ' + Plugin.toString(plugin)
            );
            delete plugin._warned;

            module.used.push(plugin.name);
        }

        if (status.length > 0) {
            global.Matter.Common.info(status.join('  '));
        }
    };

    /**
     * Recursively finds all dependencies of a module.
     * @method dependencies
     * @param module {} The module.
     * @return {object} A dependency graph.
     */
    Plugin.dependencies = function (module, tracked) {
        var parsedBase = Plugin.dependencyParse(module),
            name = parsedBase.name;
        tracked = tracked || {};

        if (tracked[name]) {
            return;
        }

        module = Plugin.resolve(module) || module;

        tracked[name] = global.Matter.Common.map(
            module.uses || [],
            function (dependency) {
                if (Plugin.isPlugin(dependency)) {
                    Plugin.register(dependency);
                }

                var parsed = Plugin.dependencyParse(dependency),
                    resolved = Plugin.resolve(dependency);

                if (
                    resolved &&
                    !Plugin.versionSatisfies(resolved.version, parsed.range)
                ) {
                    global.Matter.Common.warn(
                        'Plugin.dependencies:',
                        Plugin.toString(resolved),
                        'does not satisfy',
                        Plugin.toString(parsed),
                        'used by',
                        Plugin.toString(parsedBase) + '.'
                    );

                    resolved._warned = true;
                    module._warned = true;
                } else if (!resolved) {
                    global.Matter.Common.warn(
                        'Plugin.dependencies:',
                        Plugin.toString(dependency),
                        'used by',
                        Plugin.toString(parsedBase),
                        'could not be resolved.'
                    );

                    module._warned = true;
                }

                return parsed.name;
            }
        );

        for (var i = 0; i < tracked[name].length; i += 1) {
            Plugin.dependencies(tracked[name][i], tracked);
        }

        return tracked;
    };

    /**
     * Parses a dependency string.
     * @method dependencyParse
     * @param dependency {string} The dependency.
     * @return {object} Parsed dependency.
     */
    Plugin.dependencyParse = function (dependency) {
        if (global.Matter.Common.isString(dependency)) {
            var pattern =
                /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;

            if (!pattern.test(dependency)) {
                global.Matter.Common.warn(
                    'Plugin.dependencyParse:',
                    dependency,
                    'is not a valid dependency string.'
                );
            }

            return {
                name: dependency.split('@')[0],
                range: dependency.split('@')[1] || '*',
            };
        }

        return {
            name: dependency.name,
            range: dependency.range || dependency.version,
        };
    };
};

module.exports = init;
