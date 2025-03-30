var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Common) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Common = {};
    var Common = global.Matter.Common;

    Common._baseDelta = 1000 / 60;
    Common._nextId = 0;
    Common._seed = 0;
    Common._nowStartTime = +new Date();
    Common._warnedOnce = {};
    Common._decomp = null;

    Common.extend = function (obj, deep) {
        var argsStart, deepClone;

        if (typeof deep === 'boolean') {
            argsStart = 2;
            deepClone = deep;
        } else {
            argsStart = 1;
            deepClone = true;
        }

        for (var i = argsStart; i < arguments.length; i++) {
            var source = arguments[i];

            if (source) {
                for (var prop in source) {
                    if (
                        deepClone &&
                        source[prop] &&
                        source[prop].constructor === Object
                    ) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            Common.extend(obj[prop], deepClone, source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        }

        return obj;
    };

    Common.clone = function (obj, deep) {
        return Common.extend({}, deep, obj);
    };

    Common.keys = function (obj) {
        return Object.keys ? Object.keys(obj) : Object.getOwnPropertyNames(obj);
    };

    Common.values = function (obj) {
        return Common.keys(obj).map((key) => obj[key]);
    };

    Common.get = function (obj, path, begin, end) {
        path = path.split('.').slice(begin, end);
        for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]];
        }
        return obj;
    };

    Common.set = function (obj, path, val, begin, end) {
        var parts = path.split('.').slice(begin, end);
        Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
        return val;
    };

    Common.shuffle = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Common.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    Common.choose = function (choices) {
        return choices[Math.floor(Common.random() * choices.length)];
    };

    Common.isArray = function (obj) {
        return Array.isArray(obj);
    };

    Common.isFunction = function (obj) {
        return typeof obj === 'function';
    };

    Common.isPlainObject = function (obj) {
        return typeof obj === 'object' && obj.constructor === Object;
    };

    Common.isString = function (obj) {
        return typeof obj === 'string';
    };

    Common.clamp = function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    };

    Common.sign = function (value) {
        return value < 0 ? -1 : 1;
    };

    Common.now = function () {
        if (typeof performance !== 'undefined' && performance.now) {
            return performance.now();
        }
        return Date.now();
    };

    Common.random = function (min = 0, max = 1) {
        return min + _seededRandom() * (max - min);
    };

    var _seededRandom = function () {
        Common._seed = (Common._seed * 9301 + 49297) % 233280;
        return Common._seed / 233280;
    };

    Common.colorToNumber = function (colorString) {
        colorString = colorString.replace('#', '');
        if (colorString.length === 3) {
            colorString = colorString
                .split('')
                .map((c) => c + c)
                .join('');
        }
        return parseInt(colorString, 16);
    };

    Common.logLevel = 1;

    Common.log = function () {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.log('matter-js:', ...arguments);
        }
    };

    Common.info = function () {
        if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
            console.info('matter-js:', ...arguments);
        }
    };

    Common.warn = function () {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.warn('matter-js:', ...arguments);
        }
    };

    Common.warnOnce = function () {
        var message = Array.from(arguments).join(' ');
        if (!Common._warnedOnce[message]) {
            Common.warn(message);
            Common._warnedOnce[message] = true;
        }
    };

    Common.deprecated = function (obj, prop, warning) {
        obj[prop] = function () {
            Common.warnOnce('🔅 deprecated 🔅', warning);
            return obj[prop].__original.apply(this, arguments);
        };
        obj[prop].__original = obj[prop];
    };

    Common.nextId = function () {
        return Common._nextId++;
    };

    Common.indexOf = function (haystack, needle) {
        return haystack.indexOf
            ? haystack.indexOf(needle)
            : [].indexOf.call(haystack, needle);
    };

    Common.map = function (list, func) {
        return list.map ? list.map(func) : Array.from(list, func);
    };

    Common.topologicalSort = function (graph) {
        var result = [],
            visited = {},
            temp = {};
        for (var node in graph) {
            if (!visited[node] && !temp[node]) {
                Common._topologicalSort(node, visited, temp, graph, result);
            }
        }
        return result;
    };

    Common._topologicalSort = function (node, visited, temp, graph, result) {
        var neighbors = graph[node] || [];
        temp[node] = true;

        for (var neighbor of neighbors) {
            if (temp[neighbor]) continue;
            if (!visited[neighbor]) {
                Common._topologicalSort(neighbor, visited, temp, graph, result);
            }
        }

        temp[node] = false;
        visited[node] = true;
        result.push(node);
    };
};

module.exports = init;
