/*!
 * matter-js-reanimated 0.1.0 by @liabru
 * undefined
 * License MIT
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) Liam Brummitt and contributors.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Matter", [], factory);
	else if(typeof exports === 'object')
		exports["Matter"] = factory();
	else
		root["Matter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
        return global.Matter.Common.keys(obj).map((key) => obj[key]);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * The `Matter.Vector` module contains methods for creating and manipulating vectors.
 * Vectors are the basis of all the geometry related operations in the engine.
 * A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Vector
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Vector) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Vector = {};

    var Vector = global.Matter.Vector;

    /**
     * Creates a new vector.
     * @method create
     * @param {number} x
     * @param {number} y
     * @return {vector} A new vector
     */
    Vector.create = function (x, y) {
        return { x: x || 0, y: y || 0 };
    };

    /**
     * Returns a new vector with `x` and `y` copied from the given `vector`.
     * @method clone
     * @param {vector} vector
     * @return {vector} A new cloned vector
     */
    Vector.clone = function (vector) {
        return { x: vector.x, y: vector.y };
    };

    /**
     * Returns the magnitude (length) of a vector.
     * @method magnitude
     * @param {vector} vector
     * @return {number} The magnitude of the vector
     */
    Vector.magnitude = function (vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    };

    /**
     * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
     * @method magnitudeSquared
     * @param {vector} vector
     * @return {number} The squared magnitude of the vector
     */
    Vector.magnitudeSquared = function (vector) {
        return vector.x * vector.x + vector.y * vector.y;
    };

    /**
     * Rotates the vector about (0, 0) by specified angle.
     * @method rotate
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} [output]
     * @return {vector} The vector rotated about (0, 0)
     */
    Vector.rotate = function (vector, angle, output) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle);
        if (!output) output = {};
        var x = vector.x * cos - vector.y * sin;
        output.y = vector.x * sin + vector.y * cos;
        output.x = x;
        return output;
    };

    /**
     * Rotates the vector about a specified point by specified angle.
     * @method rotateAbout
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} point
     * @param {vector} [output]
     * @return {vector} A new vector rotated about the point
     */
    Vector.rotateAbout = function (vector, angle, point, output) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle);
        if (!output) output = {};
        var x =
            point.x + (vector.x - point.x) * cos - (vector.y - point.y) * sin;
        output.y =
            point.y + (vector.x - point.x) * sin + (vector.y - point.y) * cos;
        output.x = x;
        return output;
    };

    /**
     * Normalises a vector (such that its magnitude is `1`).
     * @method normalise
     * @param {vector} vector
     * @return {vector} A new vector normalised
     */
    Vector.normalise = function (vector) {
        var magnitude = Vector.magnitude(vector);
        if (magnitude === 0) return { x: 0, y: 0 };
        return { x: vector.x / magnitude, y: vector.y / magnitude };
    };

    /**
     * Returns the dot-product of two vectors.
     * @method dot
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The dot product of the two vectors
     */
    Vector.dot = function (vectorA, vectorB) {
        return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
    };

    /**
     * Returns the cross-product of two vectors.
     * @method cross
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The cross product of the two vectors
     */
    Vector.cross = function (vectorA, vectorB) {
        return vectorA.x * vectorB.y - vectorA.y * vectorB.x;
    };

    /**
     * Returns the cross-product of three vectors.
     * @method cross3
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} vectorC
     * @return {number} The cross product of the three vectors
     */
    Vector.cross3 = function (vectorA, vectorB, vectorC) {
        return (
            (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) -
            (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x)
        );
    };

    /**
     * Adds the two vectors.
     * @method add
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB added
     */
    Vector.add = function (vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x + vectorB.x;
        output.y = vectorA.y + vectorB.y;
        return output;
    };

    /**
     * Subtracts the two vectors.
     * @method sub
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB subtracted
     */
    Vector.sub = function (vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x - vectorB.x;
        output.y = vectorA.y - vectorB.y;
        return output;
    };

    /**
     * Multiplies a vector and a scalar.
     * @method mult
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector multiplied by scalar
     */
    Vector.mult = function (vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar };
    };

    /**
     * Divides a vector and a scalar.
     * @method div
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector divided by scalar
     */
    Vector.div = function (vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar };
    };

    /**
     * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
     * @method perp
     * @param {vector} vector
     * @param {bool} [negate=false]
     * @return {vector} The perpendicular vector
     */
    Vector.perp = function (vector, negate) {
        negate = negate === true ? -1 : 1;
        return { x: negate * -vector.y, y: negate * vector.x };
    };

    /**
     * Negates both components of a vector such that it points in the opposite direction.
     * @method neg
     * @param {vector} vector
     * @return {vector} The negated vector
     */
    Vector.neg = function (vector) {
        return { x: -vector.x, y: -vector.y };
    };

    /**
     * Returns the angle between the vector `vectorB - vectorA` and the x-axis in radians.
     * @method angle
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The angle in radians
     */
    Vector.angle = function (vectorA, vectorB) {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    };

    /**
     * Temporary vector pool (not thread-safe).
     * @property _temp
     * @type {vector[]}
     * @private
     */
    Vector._temp = [
        Vector.create(),
        Vector.create(),
        Vector.create(),
        Vector.create(),
        Vector.create(),
        Vector.create(),
    ];
};

module.exports = init;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Vector = __webpack_require__(1);
var Common = __webpack_require__(0);

/**
 * The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
 * A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
 * A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Vertices
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Vertices) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Vertices = {};

    var Vertices = global.Matter.Vertices;

    Vector();
    Common();

    /**
     * Creates a new set of `Matter.Body` compatible vertices.
     * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
     * but with some additional references required for efficient collision detection routines.
     *
     * Vertices must be specified in clockwise order.
     *
     * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
     *
     * @method create
     * @param {vector[]} points
     * @param {body} body
     */
    Vertices.create = function (points, body) {
        var vertices = [];

        for (var i = 0; i < points.length; i++) {
            var point = points[i],
                vertex = {
                    x: point.x,
                    y: point.y,
                    index: i,
                    body: body,
                    isInternal: false,
                };

            vertices.push(vertex);
        }

        return vertices;
    };

    /**
     * Parses a string containing ordered x y pairs separated by spaces (and optionally commas),
     * into a `Matter.Vertices` object for the given `Matter.Body`.
     * For parsing SVG paths, see `Svg.pathToVertices`.
     * @method fromPath
     * @param {string} path
     * @param {body} body
     * @return {vertices} vertices
     */
    Vertices.fromPath = function (path, body) {
        var pathPattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/gi,
            points = [];

        path.replace(pathPattern, function (match, x, y) {
            points.push({ x: parseFloat(x), y: parseFloat(y) });
        });

        return Vertices.create(points, body);
    };

    /**
     * Returns the centre (centroid) of the set of vertices.
     * @method centre
     * @param {vertices} vertices
     * @return {vector} The centre point
     */
    Vertices.centre = function (vertices) {
        var area = Vertices.area(vertices, true),
            centre = { x: 0, y: 0 },
            cross,
            temp,
            j;

        for (var i = 0; i < vertices.length; i++) {
            j = (i + 1) % vertices.length;
            cross = global.Matter.Vector.cross(vertices[i], vertices[j]);
            temp = global.Matter.Vector.mult(
                global.Matter.Vector.add(vertices[i], vertices[j]),
                cross
            );
            centre = global.Matter.Vector.add(centre, temp);
        }

        return global.Matter.Vector.div(centre, 6 * area);
    };

    /**
     * Returns the average (mean) of the set of vertices.
     * @method mean
     * @param {vertices} vertices
     * @return {vector} The average point
     */
    Vertices.mean = function (vertices) {
        var average = { x: 0, y: 0 };

        for (var i = 0; i < vertices.length; i++) {
            average.x += vertices[i].x;
            average.y += vertices[i].y;
        }

        return global.Matter.Vector.div(average, vertices.length);
    };

    /**
     * Returns the area of the set of vertices.
     * @method area
     * @param {vertices} vertices
     * @param {bool} signed
     * @return {number} The area
     */
    Vertices.area = function (vertices, signed) {
        var area = 0,
            j = vertices.length - 1;

        for (var i = 0; i < vertices.length; i++) {
            area +=
                (vertices[j].x - vertices[i].x) *
                (vertices[j].y + vertices[i].y);
            j = i;
        }

        if (signed) return area / 2;

        return Math.abs(area) / 2;
    };

    /**
     * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
     * @method inertia
     * @param {vertices} vertices
     * @param {number} mass
     * @return {number} The polygon's moment of inertia
     */
    Vertices.inertia = function (vertices, mass) {
        var numerator = 0,
            denominator = 0,
            v = vertices,
            cross,
            j;

        // find the polygon's moment of inertia, using second moment of area
        // from equations at http://www.physicsforums.com/showthread.php?t=25293
        for (var n = 0; n < v.length; n++) {
            j = (n + 1) % v.length;
            cross = Math.abs(global.Matter.Vector.cross(v[j], v[n]));
            numerator +=
                cross *
                (global.Matter.Vector.dot(v[j], v[j]) +
                    global.Matter.Vector.dot(v[j], v[n]) +
                    global.Matter.Vector.dot(v[n], v[n]));
            denominator += cross;
        }

        return (mass / 6) * (numerator / denominator);
    };

    /**
     * Translates the set of vertices in-place.
     * @method translate
     * @param {vertices} vertices
     * @param {vector} vector
     * @param {number} scalar
     */
    Vertices.translate = function (vertices, vector, scalar) {
        scalar = typeof scalar !== 'undefined' ? scalar : 1;

        var verticesLength = vertices.length,
            translateX = vector.x * scalar,
            translateY = vector.y * scalar,
            i;

        for (i = 0; i < verticesLength; i++) {
            vertices[i].x += translateX;
            vertices[i].y += translateY;
        }

        return vertices;
    };

    /**
     * Rotates the set of vertices in-place.
     * @method rotate
     * @param {vertices} vertices
     * @param {number} angle
     * @param {vector} point
     */
    Vertices.rotate = function (vertices, angle, point) {
        if (angle === 0) return;

        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            pointX = point.x,
            pointY = point.y,
            verticesLength = vertices.length,
            vertex,
            dx,
            dy,
            i;

        for (i = 0; i < verticesLength; i++) {
            vertex = vertices[i];
            dx = vertex.x - pointX;
            dy = vertex.y - pointY;
            vertex.x = pointX + (dx * cos - dy * sin);
            vertex.y = pointY + (dx * sin + dy * cos);
        }

        return vertices;
    };

    /**
     * Returns `true` if the `point` is inside the set of `vertices`.
     * @method contains
     * @param {vertices} vertices
     * @param {vector} point
     * @return {boolean} True if the vertices contains point, otherwise false
     */
    Vertices.contains = function (vertices, point) {
        var pointX = point.x,
            pointY = point.y,
            verticesLength = vertices.length,
            vertex = vertices[verticesLength - 1],
            nextVertex;

        for (var i = 0; i < verticesLength; i++) {
            nextVertex = vertices[i];

            if (
                (pointX - vertex.x) * (nextVertex.y - vertex.y) +
                    (pointY - vertex.y) * (vertex.x - nextVertex.x) >
                0
            ) {
                return false;
            }

            vertex = nextVertex;
        }

        return true;
    };

    /**
     * Scales the vertices from a point (default is centre) in-place.
     * @method scale
     * @param {vertices} vertices
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     */
    Vertices.scale = function (vertices, scaleX, scaleY, point) {
        if (scaleX === 1 && scaleY === 1) return vertices;

        point = point || Vertices.centre(vertices);

        var vertex, delta;

        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            delta = global.Matter.Vector.sub(vertex, point);
            vertices[i].x = point.x + delta.x * scaleX;
            vertices[i].y = point.y + delta.y * scaleY;
        }

        return vertices;
    };

    /**
     * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
     * The radius parameter is a single number or an array to specify the radius for each vertex.
     * @method chamfer
     * @param {vertices} vertices
     * @param {number[]} radius
     * @param {number} quality
     * @param {number} qualityMin
     * @param {number} qualityMax
     */
    Vertices.chamfer = function (
        vertices,
        radius,
        quality,
        qualityMin,
        qualityMax
    ) {
        if (typeof radius === 'number') {
            radius = [radius];
        } else {
            radius = radius || [8];
        }

        // quality defaults to -1, which is auto
        quality = typeof quality !== 'undefined' ? quality : -1;
        qualityMin = qualityMin || 2;
        qualityMax = qualityMax || 14;

        var newVertices = [];

        for (var i = 0; i < vertices.length; i++) {
            var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1],
                vertex = vertices[i],
                nextVertex = vertices[(i + 1) % vertices.length],
                currentRadius =
                    radius[i < radius.length ? i : radius.length - 1];

            if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
            }

            var prevNormal = global.Matter.Vector.normalise({
                x: vertex.y - prevVertex.y,
                y: prevVertex.x - vertex.x,
            });

            var nextNormal = global.Matter.Vector.normalise({
                x: nextVertex.y - vertex.y,
                y: vertex.x - nextVertex.x,
            });

            var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)),
                radiusVector = global.Matter.Vector.mult(
                    global.Matter.Common.clone(prevNormal),
                    currentRadius
                ),
                midNormal = global.Matter.Vector.normalise(
                    global.Matter.Vector.mult(
                        global.Matter.Vector.add(prevNormal, nextNormal),
                        0.5
                    )
                ),
                scaledVertex = global.Matter.Vector.sub(
                    vertex,
                    global.Matter.Vector.mult(midNormal, diagonalRadius)
                );

            var precision = quality;

            if (quality === -1) {
                // automatically decide precision
                precision = Math.pow(currentRadius, 0.32) * 1.75;
            }

            precision = global.Matter.Common.clamp(
                precision,
                qualityMin,
                qualityMax
            );

            // use an even value for precision, more likely to reduce axes by using symmetry
            if (precision % 2 === 1) precision += 1;

            var alpha = Math.acos(
                    global.Matter.Vector.dot(prevNormal, nextNormal)
                ),
                theta = alpha / precision;

            for (var j = 0; j < precision; j++) {
                newVertices.push(
                    global.Matter.Vector.add(
                        global.Matter.Vector.rotate(radiusVector, theta * j),
                        scaledVertex
                    )
                );
            }
        }

        return newVertices;
    };

    /**
     * Sorts the input vertices into clockwise order in place.
     * @method clockwiseSort
     * @param {vertices} vertices
     * @return {vertices} vertices
     */
    Vertices.clockwiseSort = function (vertices) {
        var centre = Vertices.mean(vertices);

        vertices.sort(function (vertexA, vertexB) {
            return (
                global.Matter.Vector.angle(centre, vertexA) -
                global.Matter.Vector.angle(centre, vertexB)
            );
        });

        return vertices;
    };

    /**
     * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
     * @method isConvex
     * @param {vertices} vertices
     * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
     */
    Vertices.isConvex = function (vertices) {
        // http://paulbourke.net/geometry/polygonmesh/
        // Copyright (c) Paul Bourke (use permitted)

        var flag = 0,
            n = vertices.length,
            i,
            j,
            k,
            z;

        if (n < 3) return null;

        for (i = 0; i < n; i++) {
            j = (i + 1) % n;
            k = (i + 2) % n;
            z =
                (vertices[j].x - vertices[i].x) *
                    (vertices[k].y - vertices[j].y) -
                (vertices[j].y - vertices[i].y) *
                    (vertices[k].x - vertices[j].x);

            if (z < 0) {
                flag |= 1;
            } else if (z > 0) {
                flag |= 2;
            }

            if (flag === 3) {
                return false;
            }
        }

        if (flag !== 0) {
            return true;
        } else {
            return null;
        }
    };

    /**
     * Returns the convex hull of the input vertices as a new array of points.
     * @method hull
     * @param {vertices} vertices
     * @return [vertex] vertices
     */
    Vertices.hull = function (vertices) {
        // http://geomalgorithms.com/a10-_hull-1.html

        var upper = [],
            lower = [],
            vertex,
            i;

        // sort vertices on x-axis (y-axis for ties)
        vertices = vertices.slice(0);
        vertices.sort(function (vertexA, vertexB) {
            var dx = vertexA.x - vertexB.x;
            return dx !== 0 ? dx : vertexA.y - vertexB.y;
        });

        // build lower hull
        for (i = 0; i < vertices.length; i += 1) {
            vertex = vertices[i];

            while (
                lower.length >= 2 &&
                global.Matter.Vector.cross3(
                    lower[lower.length - 2],
                    lower[lower.length - 1],
                    vertex
                ) <= 0
            ) {
                lower.pop();
            }

            lower.push(vertex);
        }

        // build upper hull
        for (i = vertices.length - 1; i >= 0; i -= 1) {
            vertex = vertices[i];

            while (
                upper.length >= 2 &&
                global.Matter.Vector.cross3(
                    upper[upper.length - 2],
                    upper[upper.length - 1],
                    vertex
                ) <= 0
            ) {
                upper.pop();
            }

            upper.push(vertex);
        }

        // concatenation of the lower and upper hulls gives the convex hull
        // omit last points because they are repeated at the beginning of the other list
        upper.pop();
        lower.pop();

        return upper.concat(lower);
    };
};

module.exports = init;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * The `Matter.Bounds` module contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
 *
 * @class Bounds
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Bounds) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Bounds = {};

    var Bounds = global.Matter.Bounds;

    /**
     * Creates a new axis-aligned bounding box (AABB) for the given vertices.
     * @method create
     * @param {vertices} vertices
     * @return {bounds} A new bounds object
     */
    Bounds.create = function (vertices) {
        var bounds = {
            min: { x: 0, y: 0 },
            max: { x: 0, y: 0 },
        };

        if (vertices) Bounds.update(bounds, vertices);

        return bounds;
    };

    /**
     * Updates bounds using the given vertices and extends the bounds given a velocity.
     * @method update
     * @param {bounds} bounds
     * @param {vertices} vertices
     * @param {vector} velocity
     */
    Bounds.update = function (bounds, vertices, velocity) {
        bounds.min.x = Infinity;
        bounds.max.x = -Infinity;
        bounds.min.y = Infinity;
        bounds.max.y = -Infinity;

        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
            if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
            if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
            if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
        }

        if (velocity) {
            if (velocity.x > 0) {
                bounds.max.x += velocity.x;
            } else {
                bounds.min.x += velocity.x;
            }

            if (velocity.y > 0) {
                bounds.max.y += velocity.y;
            } else {
                bounds.min.y += velocity.y;
            }
        }
    };

    /**
     * Returns true if the bounds contains the given point.
     * @method contains
     * @param {bounds} bounds
     * @param {vector} point
     * @return {boolean} True if the bounds contain the point, otherwise false
     */
    Bounds.contains = function (bounds, point) {
        return (
            point.x >= bounds.min.x &&
            point.x <= bounds.max.x &&
            point.y >= bounds.min.y &&
            point.y <= bounds.max.y
        );
    };

    /**
     * Returns true if the two bounds intersect.
     * @method overlaps
     * @param {bounds} boundsA
     * @param {bounds} boundsB
     * @return {boolean} True if the bounds overlap, otherwise false
     */
    Bounds.overlaps = function (boundsA, boundsB) {
        return (
            boundsA.min.x <= boundsB.max.x &&
            boundsA.max.x >= boundsB.min.x &&
            boundsA.max.y >= boundsB.min.y &&
            boundsA.min.y <= boundsB.max.y
        );
    };

    /**
     * Translates the bounds by the given vector.
     * @method translate
     * @param {bounds} bounds
     * @param {vector} vector
     */
    Bounds.translate = function (bounds, vector) {
        bounds.min.x += vector.x;
        bounds.max.x += vector.x;
        bounds.min.y += vector.y;
        bounds.max.y += vector.y;
    };

    /**
     * Shifts the bounds to the given position.
     * @method shift
     * @param {bounds} bounds
     * @param {vector} position
     */
    Bounds.shift = function (bounds, position) {
        var deltaX = bounds.max.x - bounds.min.x,
            deltaY = bounds.max.y - bounds.min.y;

        bounds.min.x = position.x;
        bounds.max.x = position.x + deltaX;
        bounds.min.y = position.y;
        bounds.max.y = position.y + deltaY;
    };
};

module.exports = init;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Vertices = __webpack_require__(2);
var Vector = __webpack_require__(1);
var Sleeping = __webpack_require__(5);
var Common = __webpack_require__(0);
var Bounds = __webpack_require__(3);
var Axes = __webpack_require__(8);

/**
* The `Matter.Body` module contains methods for creating and manipulating rigid bodies.
* For creating bodies with common configurations such as rectangles, circles and other polygons see the module `Matter.Bodies`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).

* @class Body
*/

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Body) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Body = {};

    var Body = global.Matter.Body;

    Vertices();
    Vector();
    Sleeping();
    Common();
    Bounds();
    Axes();

    Body._timeCorrection = true;
    Body._inertiaScale = 4;
    Body._nextCollidingGroupId = 1;
    Body._nextNonCollidingGroupId = -1;
    Body._nextCategory = 0x0001;
    Body._baseDelta = 1000 / 60;

    /**
     * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * Vertices must be specified in clockwise order.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {body} body
     */
    Body.create = function (options) {
        var defaults = {
            id: global.Matter.Common.nextId(),
            type: 'body',
            label: 'Body',
            parts: [],
            plugin: {},
            angle: 0,
            vertices: global.Matter.Vertices.fromPath(
                'L 0 0 L 40 0 L 40 40 L 0 40'
            ),
            position: { x: 0, y: 0 },
            force: { x: 0, y: 0 },
            torque: 0,
            positionImpulse: { x: 0, y: 0 },
            constraintImpulse: { x: 0, y: 0, angle: 0 },
            totalContacts: 0,
            speed: 0,
            angularSpeed: 0,
            velocity: { x: 0, y: 0 },
            angularVelocity: 0,
            isSensor: false,
            isStatic: false,
            isSleeping: false,
            motion: 0,
            sleepThreshold: 60,
            density: 0.001,
            restitution: 0,
            friction: 0.1,
            frictionStatic: 0.5,
            frictionAir: 0.01,
            collisionFilter: {
                category: 0x0001,
                mask: 0xffffffff,
                group: 0,
            },
            slop: 0.05,
            timeScale: 1,
            render: {
                visible: true,
                opacity: 1,
                strokeStyle: null,
                fillStyle: null,
                lineWidth: null,
                sprite: {
                    xScale: 1,
                    yScale: 1,
                    xOffset: 0,
                    yOffset: 0,
                },
            },
            events: null,
            bounds: null,
            chamfer: null,
            circleRadius: 0,
            positionPrev: null,
            anglePrev: 0,
            parent: null,
            axes: null,
            area: 0,
            mass: 0,
            inertia: 0,
            deltaTime: 1000 / 60,
            _original: null,
        };

        var body = { ...defaults, ...options };

        _initProperties(body, options);

        return body;
    };

    /**
     * Returns the next unique group index for which bodies will collide.
     * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
     * See `body.collisionFilter` for more information.
     * @method nextGroup
     * @param {bool} [isNonColliding=false]
     * @return {Number} Unique group index
     */
    Body.nextGroup = function (isNonColliding) {
        if (isNonColliding) return Body._nextNonCollidingGroupId--;

        return Body._nextCollidingGroupId++;
    };

    /**
     * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
     * There are 32 available. See `body.collisionFilter` for more information.
     * @method nextCategory
     * @return {Number} Unique category bitfield
     */
    Body.nextCategory = function () {
        Body._nextCategory = Body._nextCategory << 1;
        return Body._nextCategory;
    };

    /**
     * Initialises body properties.
     * @method _initProperties
     * @private
     * @param {body} body
     * @param {} [options]
     */
    var _initProperties = function (body, options) {
        options = options || {};

        // init required properties (order is important)
        global.Matter.Body.set(body, {
            bounds: body.bounds || global.Matter.Bounds.create(body.vertices),
            positionPrev:
                body.positionPrev || global.Matter.Vector.clone(body.position),
            anglePrev: body.anglePrev || body.angle,
            vertices: body.vertices,
            parts: body.parts || [body],
            isStatic: body.isStatic,
            isSleeping: body.isSleeping,
            parent: body.parent || body,
        });

        global.Matter.Vertices.rotate(body.vertices, body.angle, body.position);
        global.Matter.Axes.rotate(body.axes, body.angle);
        global.Matter.Bounds.update(body.bounds, body.vertices, body.velocity);

        // allow options to override the automatically calculated properties
        global.Matter.Body.set(body, {
            axes: options.axes || body.axes,
            area: options.area || body.area,
            mass: options.mass || body.mass,
            inertia: options.inertia || body.inertia,
        });

        // render properties
        var defaultFillStyle = body.isStatic
                ? '#14151f'
                : global.Matter.Common.choose([
                      '#f19648',
                      '#f5d259',
                      '#f55a3c',
                      '#063e7b',
                      '#ececd1',
                  ]),
            defaultStrokeStyle = body.isStatic ? '#555' : '#ccc',
            defaultLineWidth =
                body.isStatic && body.render.fillStyle === null ? 1 : 0;
        body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
        body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
        body.render.lineWidth = body.render.lineWidth || defaultLineWidth;
        body.render.sprite.xOffset +=
            -(body.bounds.min.x - body.position.x) /
            (body.bounds.max.x - body.bounds.min.x);
        body.render.sprite.yOffset +=
            -(body.bounds.min.y - body.position.y) /
            (body.bounds.max.y - body.bounds.min.y);
    };

    /**
     * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
     * Prefer to use the actual setter functions in performance critical situations.
     * @method set
     * @param {body} body
     * @param {} settings A property name (or map of properties and values) to set on the body.
     * @param {} value The value to set if `settings` is a single property name.
     */
    Body.set = function (body, settings, value) {
        var property;

        if (typeof settings === 'string') {
            property = settings;
            settings = {};
            settings[property] = value;
        }

        for (property in settings) {
            value = settings[property];
            switch (property) {
                case 'isStatic':
                    global.Matter.Body.setStatic(body, value);
                    break;
                case 'isSleeping':
                    global.Matter.Sleeping.set(body, value);
                    break;
                case 'mass':
                    global.Matter.Body.setMass(body, value);
                    break;
                case 'density':
                    global.Matter.Body.setDensity(body, value);
                    break;
                case 'inertia':
                    global.Matter.Body.setInertia(body, value);
                    break;
                case 'vertices':
                    global.Matter.Body.setVertices(body, value);
                    break;
                case 'position':
                    global.Matter.Body.setPosition(body, value);
                    break;
                case 'angle':
                    global.Matter.Body.setAngle(body, value);
                    break;
                case 'velocity':
                    global.Matter.Body.setVelocity(body, value);
                    break;
                case 'angularVelocity':
                    global.Matter.Body.setAngularVelocity(body, value);
                    break;
                case 'speed':
                    global.Matter.Body.setSpeed(body, value);
                    break;
                case 'angularSpeed':
                    global.Matter.Body.setAngularSpeed(body, value);
                    break;
                case 'parts':
                    global.Matter.Body.setParts(body, value);
                    break;
                case 'centre':
                    global.Matter.Body.setCentre(body, value);
                    break;
                default:
                    body[property] = value;
            }
        }
    };

    /**
     * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
     * @method setStatic
     * @param {body} body
     * @param {bool} isStatic
     */
    Body.setStatic = function (body, isStatic) {
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            if (isStatic) {
                if (!part.isStatic) {
                    part._original = {
                        restitution: part.restitution,
                        friction: part.friction,
                        mass: part.mass,
                        inertia: part.inertia,
                        density: part.density,
                        inverseMass: part.inverseMass,
                        inverseInertia: part.inverseInertia,
                    };
                }

                part.restitution = 0;
                part.friction = 1;
                part.mass = part.inertia = part.density = Infinity;
                part.inverseMass = part.inverseInertia = 0;

                part.positionPrev.x = part.position.x;
                part.positionPrev.y = part.position.y;
                part.anglePrev = part.angle;
                part.angularVelocity = 0;
                part.speed = 0;
                part.angularSpeed = 0;
                part.motion = 0;
            } else if (part._original) {
                part.restitution = part._original.restitution;
                part.friction = part._original.friction;
                part.mass = part._original.mass;
                part.inertia = part._original.inertia;
                part.density = part._original.density;
                part.inverseMass = part._original.inverseMass;
                part.inverseInertia = part._original.inverseInertia;

                part._original = null;
            }

            part.isStatic = isStatic;
        }
    };

    /**
     * Sets the mass of the body. Inverse mass, density and inertia are automatically updated to reflect the change.
     * @method setMass
     * @param {body} body
     * @param {number} mass
     */
    Body.setMass = function (body, mass) {
        var moment = body.inertia / (body.mass / 6);
        body.inertia = moment * (mass / 6);
        body.inverseInertia = 1 / body.inertia;

        body.mass = mass;
        body.inverseMass = 1 / body.mass;
        body.density = body.mass / body.area;
    };

    /**
     * Sets the density of the body. Mass and inertia are automatically updated to reflect the change.
     * @method setDensity
     * @param {body} body
     * @param {number} density
     */
    Body.setDensity = function (body, density) {
        Body.setMass(body, density * body.area);
        body.density = density;
    };

    /**
     * Sets the moment of inertia of the body. This is the second moment of area in two dimensions.
     * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
     * @method setInertia
     * @param {body} body
     * @param {number} inertia
     */
    Body.setInertia = function (body, inertia) {
        body.inertia = inertia;
        body.inverseInertia = 1 / body.inertia;
    };

    /**
     * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
     * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
     * They are then automatically translated to world space based on `body.position`.
     *
     * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
     * Vertices must form a convex hull. Concave vertices must be decomposed into convex parts.
     *
     * @method setVertices
     * @param {body} body
     * @param {vector[]} vertices
     */
    Body.setVertices = function (body, vertices) {
        // change vertices
        if (vertices[0].body === body) {
            body.vertices = vertices;
        } else {
            body.vertices = global.Matter.Vertices.create(vertices, body);
        }

        // update properties
        body.axes = global.Matter.Axes.fromVertices(body.vertices);
        body.area = global.Matter.Vertices.area(body.vertices);
        global.Matter.Body.setMass(body, body.density * body.area);

        // orient vertices around the centre of mass at origin (0, 0)
        var centre = global.Matter.Vertices.centre(body.vertices);
        global.Matter.Vertices.translate(body.vertices, centre, -1);

        // update inertia while vertices are at origin (0, 0)
        global.Matter.Body.setInertia(
            body,
            global.Matter.Body._inertiaScale *
                global.Matter.Vertices.inertia(body.vertices, body.mass)
        );

        // update geometry
        global.Matter.Vertices.translate(body.vertices, body.position);
        global.Matter.Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Sets the parts of the `body`.
     *
     * See `body.parts` for details and requirements on how parts are used.
     *
     * See Bodies.fromVertices for a related utility.
     *
     * This function updates `body` mass, inertia and centroid based on the parts geometry.
     * Sets each `part.parent` to be this `body`.
     *
     * The convex hull is computed and set on this `body` (unless `autoHull` is `false`).
     * Automatically ensures that the first part in `body.parts` is the `body`.
     * @method setParts
     * @param {body} body
     * @param {body[]} parts
     * @param {bool} [autoHull=true]
     */
    Body.setParts = function (body, parts, autoHull) {
        var i;

        // add all the parts, ensuring that the first part is always the parent body
        parts = parts.slice(0);
        body.parts.length = 0;
        body.parts.push(body);
        body.parent = body;

        for (i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part !== body) {
                part.parent = body;
                body.parts.push(part);
            }
        }

        if (body.parts.length === 1) return;

        autoHull = typeof autoHull !== 'undefined' ? autoHull : true;

        // find the convex hull of all parts to set on the parent body
        if (autoHull) {
            var vertices = [];
            for (i = 0; i < parts.length; i++) {
                vertices = vertices.concat(parts[i].vertices);
            }

            global.Matter.Vertices.clockwiseSort(vertices);

            var hull = global.Matter.Vertices.hull(vertices),
                hullCentre = global.Matter.Vertices.centre(hull);

            Body.setVertices(body, hull);
            global.Matter.Vertices.translate(body.vertices, hullCentre);
        }

        // sum the properties of all compound parts of the parent body
        var total = Body._totalProperties(body);

        body.area = total.area;
        body.parent = body;
        body.position.x = total.centre.x;
        body.position.y = total.centre.y;
        body.positionPrev.x = total.centre.x;
        body.positionPrev.y = total.centre.y;

        Body.setMass(body, total.mass);
        Body.setInertia(body, total.inertia);
        Body.setPosition(body, total.centre);
    };

    /**
     * Set the centre of mass of the body.
     * The `centre` is a vector in world-space unless `relative` is set, in which case it is a translation.
     * The centre of mass is the point the body rotates about and can be used to simulate non-uniform density.
     * This is equal to moving `body.position` but not the `body.vertices`.
     * Invalid if the `centre` falls outside the body's convex hull.
     * @method setCentre
     * @param {body} body
     * @param {vector} centre
     * @param {bool} relative
     */
    Body.setCentre = function (body, centre, relative) {
        if (!relative) {
            body.positionPrev.x =
                centre.x - (body.position.x - body.positionPrev.x);
            body.positionPrev.y =
                centre.y - (body.position.y - body.positionPrev.y);
            body.position.x = centre.x;
            body.position.y = centre.y;
        } else {
            body.positionPrev.x += centre.x;
            body.positionPrev.y += centre.y;
            body.position.x += centre.x;
            body.position.y += centre.y;
        }
    };

    /**
     * Sets the position of the body. By default velocity is unchanged.
     * If `updateVelocity` is `true` then velocity is inferred from the change in position.
     * @method setPosition
     * @param {body} body
     * @param {vector} position
     * @param {boolean} [updateVelocity=false]
     */
    Body.setPosition = function (body, position, updateVelocity) {
        var delta = global.Matter.Vector.sub(position, body.position);

        if (updateVelocity) {
            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;
            body.velocity.x = delta.x;
            body.velocity.y = delta.y;
            body.speed = global.Matter.Vector.magnitude(delta);
        } else {
            body.positionPrev.x += delta.x;
            body.positionPrev.y += delta.y;
        }

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.position.x += delta.x;
            part.position.y += delta.y;
            global.Matter.Vertices.translate(part.vertices, delta);
            global.Matter.Bounds.update(
                part.bounds,
                part.vertices,
                body.velocity
            );
        }
    };

    /**
     * Sets the angle of the body. By default angular velocity is unchanged.
     * If `updateVelocity` is `true` then angular velocity is inferred from the change in angle.
     * @method setAngle
     * @param {body} body
     * @param {number} angle
     * @param {boolean} [updateVelocity=false]
     */
    Body.setAngle = function (body, angle, updateVelocity) {
        var delta = angle - body.angle;

        if (updateVelocity) {
            body.anglePrev = body.angle;
            body.angularVelocity = delta;
            body.angularSpeed = Math.abs(delta);
        } else {
            body.anglePrev += delta;
        }

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.angle += delta;
            global.Matter.Vertices.rotate(part.vertices, delta, body.position);
            global.Matter.Axes.rotate(part.axes, delta);
            global.Matter.Bounds.update(
                part.bounds,
                part.vertices,
                body.velocity
            );
            if (i > 0) {
                global.Matter.Vector.rotateAbout(
                    part.position,
                    delta,
                    body.position,
                    part.position
                );
            }
        }
    };

    /**
     * Sets the current linear velocity of the body.
     * Affects body speed.
     * @method setVelocity
     * @param {body} body
     * @param {vector} velocity
     */
    Body.setVelocity = function (body, velocity) {
        var timeScale = body.deltaTime / Body._baseDelta;
        body.positionPrev.x = body.position.x - velocity.x * timeScale;
        body.positionPrev.y = body.position.y - velocity.y * timeScale;
        body.velocity.x = (body.position.x - body.positionPrev.x) / timeScale;
        body.velocity.y = (body.position.y - body.positionPrev.y) / timeScale;
        body.speed = global.Matter.Vector.magnitude(body.velocity);
    };

    /**
     * Gets the current linear velocity of the body.
     * @method getVelocity
     * @param {body} body
     * @return {vector} velocity
     */
    Body.getVelocity = function (body) {
        var timeScale = Body._baseDelta / body.deltaTime;

        return {
            x: (body.position.x - body.positionPrev.x) * timeScale,
            y: (body.position.y - body.positionPrev.y) * timeScale,
        };
    };

    /**
     * Gets the current linear speed of the body.
     * Equivalent to the magnitude of its velocity.
     * @method getSpeed
     * @param {body} body
     * @return {number} speed
     */
    Body.getSpeed = function (body) {
        return global.Matter.Vector.magnitude(Body.getVelocity(body));
    };

    /**
     * Sets the current linear speed of the body.
     * Direction is maintained. Affects body velocity.
     * @method setSpeed
     * @param {body} body
     * @param {number} speed
     */
    Body.setSpeed = function (body, speed) {
        Body.setVelocity(
            body,
            global.Matter.Vector.mult(
                global.Matter.Vector.normalise(Body.getVelocity(body)),
                speed
            )
        );
    };

    /**
     * Sets the current rotational velocity of the body.
     * Affects body angular speed.
     * @method setAngularVelocity
     * @param {body} body
     * @param {number} velocity
     */
    Body.setAngularVelocity = function (body, velocity) {
        var timeScale = body.deltaTime / Body._baseDelta;
        body.anglePrev = body.angle - velocity * timeScale;
        body.angularVelocity = (body.angle - body.anglePrev) / timeScale;
        body.angularSpeed = Math.abs(body.angularVelocity);
    };

    /**
     * Gets the current rotational velocity of the body.
     * @method getAngularVelocity
     * @param {body} body
     * @return {number} angular velocity
     */
    Body.getAngularVelocity = function (body) {
        return (
            ((body.angle - body.anglePrev) * Body._baseDelta) / body.deltaTime
        );
    };

    /**
     * Gets the current rotational speed of the body.
     * Equivalent to the magnitude of its angular velocity.
     * @method getAngularSpeed
     * @param {body} body
     * @return {number} angular speed
     */
    Body.getAngularSpeed = function (body) {
        return Math.abs(Body.getAngularVelocity(body));
    };

    /**
     * Sets the current rotational speed of the body.
     * Direction is maintained. Affects body angular velocity.
     * @method setAngularSpeed
     * @param {body} body
     * @param {number} speed
     */
    Body.setAngularSpeed = function (body, speed) {
        Body.setAngularVelocity(
            body,
            global.Matter.Common.sign(Body.getAngularVelocity(body)) * speed
        );
    };

    /**
     * Moves a body by a given vector relative to its current position. By default velocity is unchanged.
     * If `updateVelocity` is `true` then velocity is inferred from the change in position.
     * @method translate
     * @param {body} body
     * @param {vector} translation
     * @param {boolean} [updateVelocity=false]
     */
    Body.translate = function (body, translation, updateVelocity) {
        Body.setPosition(
            body,
            global.Matter.Vector.add(body.position, translation),
            updateVelocity
        );
    };

    /**
     * Rotates a body by a given angle relative to its current angle. By default angular velocity is unchanged.
     * If `updateVelocity` is `true` then angular velocity is inferred from the change in angle.
     * @method rotate
     * @param {body} body
     * @param {number} rotation
     * @param {vector} [point]
     * @param {boolean} [updateVelocity=false]
     */
    Body.rotate = function (body, rotation, point, updateVelocity) {
        if (!point) {
            Body.setAngle(body, body.angle + rotation, updateVelocity);
        } else {
            var cos = Math.cos(rotation),
                sin = Math.sin(rotation),
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;

            Body.setPosition(
                body,
                {
                    x: point.x + (dx * cos - dy * sin),
                    y: point.y + (dx * sin + dy * cos),
                },
                updateVelocity
            );

            Body.setAngle(body, body.angle + rotation, updateVelocity);
        }
    };

    /**
     * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
     * @method scale
     * @param {body} body
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} [point]
     */
    Body.scale = function (body, scaleX, scaleY, point) {
        var totalArea = 0,
            totalInertia = 0;

        point = point || body.position;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            // scale vertices
            global.Matter.Vertices.scale(part.vertices, scaleX, scaleY, point);

            // update properties
            part.axes = global.Matter.Axes.fromVertices(part.vertices);
            part.area = global.Matter.Vertices.area(part.vertices);
            Body.setMass(part, body.density * part.area);

            // update inertia (requires vertices to be at origin)
            global.Matter.Vertices.translate(part.vertices, {
                x: -part.position.x,
                y: -part.position.y,
            });
            Body.setInertia(
                part,
                Body._inertiaScale *
                    global.Matter.Vertices.inertia(part.vertices, part.mass)
            );
            global.Matter.Vertices.translate(part.vertices, {
                x: part.position.x,
                y: part.position.y,
            });

            if (i > 0) {
                totalArea += part.area;
                totalInertia += part.inertia;
            }

            // scale position
            part.position.x = point.x + (part.position.x - point.x) * scaleX;
            part.position.y = point.y + (part.position.y - point.y) * scaleY;

            // update bounds
            global.Matter.Bounds.update(
                part.bounds,
                part.vertices,
                body.velocity
            );
        }

        // handle parent body
        if (body.parts.length > 1) {
            body.area = totalArea;

            if (!body.isStatic) {
                Body.setMass(body, body.density * totalArea);
                Body.setInertia(body, totalInertia);
            }
        }

        // handle circles
        if (body.circleRadius) {
            if (scaleX === scaleY) {
                body.circleRadius *= scaleX;
            } else {
                // body is no longer a circle
                body.circleRadius = null;
            }
        }
    };

    /**
     * Performs an update by integrating the equations of motion on the `body`.
     * This is applied every update by `Matter.Engine` automatically.
     * @method update
     * @param {body} body
     * @param {number} [deltaTime=16.666]
     */
    Body.update = function (body, deltaTime) {
        deltaTime =
            (typeof deltaTime !== 'undefined' ? deltaTime : 1000 / 60) *
            body.timeScale;

        var deltaTimeSquared = deltaTime * deltaTime,
            correction = Body._timeCorrection
                ? deltaTime / (body.deltaTime || deltaTime)
                : 1;

        // from the previous step
        var frictionAir =
                1 -
                body.frictionAir *
                    (deltaTime / global.Matter.Common._baseDelta),
            velocityPrevX =
                (body.position.x - body.positionPrev.x) * correction,
            velocityPrevY =
                (body.position.y - body.positionPrev.y) * correction;

        // update velocity with Verlet integration
        body.velocity.x =
            velocityPrevX * frictionAir +
            (body.force.x / body.mass) * deltaTimeSquared;
        body.velocity.y =
            velocityPrevY * frictionAir +
            (body.force.y / body.mass) * deltaTimeSquared;

        body.positionPrev.x = body.position.x;
        body.positionPrev.y = body.position.y;
        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;
        body.deltaTime = deltaTime;

        // update angular velocity with Verlet integration
        body.angularVelocity =
            (body.angle - body.anglePrev) * frictionAir * correction +
            (body.torque / body.inertia) * deltaTimeSquared;
        body.anglePrev = body.angle;
        body.angle += body.angularVelocity;

        // transform the body geometry
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            global.Matter.Vertices.translate(part.vertices, body.velocity);

            if (i > 0) {
                part.position.x += body.velocity.x;
                part.position.y += body.velocity.y;
            }

            if (body.angularVelocity !== 0) {
                global.Matter.Vertices.rotate(
                    part.vertices,
                    body.angularVelocity,
                    body.position
                );
                global.Matter.Axes.rotate(part.axes, body.angularVelocity);
                if (i > 0) {
                    global.Matter.Vector.rotateAbout(
                        part.position,
                        body.angularVelocity,
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
    };

    /**
     * Updates properties `body.velocity`, `body.speed`, `body.angularVelocity` and `body.angularSpeed` which are normalised in relation to `Body._baseDelta`.
     * @method updateVelocities
     * @param {body} body
     */
    Body.updateVelocities = function (body) {
        var timeScale = Body._baseDelta / body.deltaTime,
            bodyVelocity = body.velocity;

        bodyVelocity.x = (body.position.x - body.positionPrev.x) * timeScale;
        bodyVelocity.y = (body.position.y - body.positionPrev.y) * timeScale;
        body.speed = Math.sqrt(
            bodyVelocity.x * bodyVelocity.x + bodyVelocity.y * bodyVelocity.y
        );

        body.angularVelocity = (body.angle - body.anglePrev) * timeScale;
        body.angularSpeed = Math.abs(body.angularVelocity);
    };

    /**
     * Applies the `force` to the `body` from the force origin `position` in world-space, over a single timestep, including applying any resulting angular torque.
     *
     * Forces are useful for effects like gravity, wind or rocket thrust, but can be difficult in practice when precise control is needed. In these cases see `Body.setVelocity` and `Body.setPosition` as an alternative.
     *
     * The force from this function is only applied once for the duration of a single timestep, in other words the duration depends directly on the current engine update delta and the rate of calls to this function.
     *
     * Therefore to account for time, you should apply the force constantly over as many engine updates as equivalent to the intended duration.
     *
     * If all or part of the force duration is some fraction of a timestep, first multiply the force by duration / timestep.
     *
     * The force origin position in world-space must also be specified. Passing body.position will result in zero angular effect as the force origin would be at the centre of mass.
     *
     * The body will take time to accelerate under a force, the resulting effect depends on duration of the force, the body mass and other forces on the body including friction combined.
     * @method applyForce
     * @param {body} body
     * @param {vector} position The force origin in world-space. Pass body.position to avoid angular torque.
     * @param {vector} force
     */
    Body.applyForce = function (body, position, force) {
        var offset = {
            x: position.x - body.position.x,
            y: position.y - body.position.y,
        };
        body.force.x += force.x;
        body.force.y += force.y;
        body.torque += offset.x * force.y - offset.y * force.x;
    };
    /**
     * Returns the sums of the properties of all compound parts of the parent body.
     * @method _totalProperties
     * @private
     * @param {body} body
     * @return {}
     */
    Body._totalProperties = function (body) {
        // from equations at:
        // https://ecourses.ou.edu/cgi-bin/ebook.cgi?doc=&topic=st&chap_sec=07.2&page=theory
        // http://output.to/sideway/default.asp?qno=121100087

        var properties = {
            mass: 0,
            area: 0,
            inertia: 0,
            centre: { x: 0, y: 0 },
        };

        // sum the properties of all compound parts of the parent body
        for (
            var i = body.parts.length === 1 ? 0 : 1;
            i < body.parts.length;
            i++
        ) {
            var part = body.parts[i],
                mass = part.mass !== Infinity ? part.mass : 1;

            properties.mass += mass;
            properties.area += part.area;
            properties.inertia += part.inertia;
            properties.centre = global.Matter.Vector.add(
                properties.centre,
                global.Matter.Vector.mult(part.position, mass)
            );
        }

        properties.centre = global.Matter.Vector.div(
            properties.centre,
            properties.mass
        );

        return properties;
    };

    /*
     *
     *  Events Documentation
     *
     */

    /**
     * Fired when a body starts sleeping (where `this` is the body).
     *
     * @event sleepStart
     * @this {body} The body that has started sleeping
     * @param {} event An event object
     * @param {} event.source The source object of the event
     * @param {} event.name The name of the event
     */

    /**
     * Fired when a body ends sleeping (where `this` is the body).
     *
     * @event sleepEnd
     * @this {body} The body that has ended sleeping
     * @param {} event An event object
     * @param {} event.source The source object of the event
     * @param {} event.name The name of the event
     */

    /*
     *
     *  Properties Documentation
     *
     */

    /**
     * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * _Read only_. Set by `Body.create`.
     *
     * A `String` denoting the type of object.
     *
     * @readOnly
     * @property type
     * @type string
     * @default "body"
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Body"
     */

    /**
     * _Read only_. Use `Body.setParts` to set.
     *
     * See `Bodies.fromVertices` for a related utility.
     *
     * An array of bodies (the 'parts') that make up this body (the 'parent'). The first body in this array must always be a self-reference to this `body`.
     *
     * The parts are fixed together and therefore perform as a single unified rigid body.
     *
     * Parts in relation to each other are allowed to overlap, as well as form gaps or holes, so can be used to create complex concave bodies unlike when using a single part.
     *
     * Use properties and functions on the parent `body` rather than on parts.
     *
     * Outside of their geometry, most properties on parts are not considered or updated.
     * As such 'per-part' material properties among others are not currently considered.
     *
     * Parts should be created specifically for their parent body.
     * Parts should not be shared or reused between bodies, only one parent is supported.
     * Parts should not have their own parts, they are not handled recursively.
     * Parts should not be added to the world directly or any other composite.
     * Parts own vertices must be convex and in clockwise order.
     *
     * A body with more than one part is sometimes referred to as a 'compound' body.
     *
     * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
     *
     * @readOnly
     * @property parts
     * @type body[]
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * _Read only_. Updated by `Body.setParts`.
     *
     * A reference to the body that this is a part of. See `body.parts`.
     * This is a self reference if the body is not a part of another body.
     *
     * @readOnly
     * @property parent
     * @type body
     */

    /**
     * A `Number` specifying the angle of the body, in radians.
     *
     * @property angle
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setVertices` or `Body.setParts` to set. See also `Bodies.fromVertices`.
     *
     * An array of `Vector` objects that specify the convex hull of the rigid body.
     * These should be provided about the origin `(0, 0)`. E.g.
     *
     * `[{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]`
     *
     * Vertices must always be convex, in clockwise order and must not contain any duplicate points.
     *
     * Concave vertices should be decomposed into convex `parts`, see `Bodies.fromVertices` and `Body.setParts`.
     *
     * When set the vertices are translated such that `body.position` is at the centre of mass.
     * Many other body properties are automatically calculated from these vertices when set including `density`, `area` and `inertia`.
     *
     * The module `Matter.Vertices` contains useful methods for working with vertices.
     *
     * @readOnly
     * @property vertices
     * @type vector[]
     */

    /**
     * _Read only_. Use `Body.setPosition` to set.
     *
     * A `Vector` that specifies the current world-space position of the body.
     *
     * @readOnly
     * @property position
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that accumulates the total force applied to the body for a single update.
     * Force is zeroed after every `Engine.update`, so constant forces should be applied for every update they are needed. See also `Body.applyForce`.
     *
     * @property force
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that accumulates the total torque (turning force) applied to the body for a single update. See also `Body.applyForce`.
     * Torque is zeroed after every `Engine.update`, so constant torques should be applied for every update they are needed.
     *
     * Torques result in angular acceleration on every update, which depends on body inertia and the engine update delta.
     *
     * @property torque
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setSpeed` to set.
     *
     * See `Body.getSpeed` for details.
     *
     * Equivalent to the magnitude of `body.velocity` (always positive).
     *
     * @readOnly
     * @property speed
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setVelocity` to set.
     *
     * See `Body.getVelocity` for details.
     *
     * Equivalent to the magnitude of `body.angularVelocity` (always positive).
     *
     * @readOnly
     * @property velocity
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * _Read only_. Use `Body.setAngularSpeed` to set.
     *
     * See `Body.getAngularSpeed` for details.
     *
     *
     * @readOnly
     * @property angularSpeed
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setAngularVelocity` to set.
     *
     * See `Body.getAngularVelocity` for details.
     *
     *
     * @readOnly
     * @property angularVelocity
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setStatic` to set.
     *
     * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
     *
     * @readOnly
     * @property isStatic
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
     *
     * @property isSensor
     * @type boolean
     * @default false
     */

    /**
     * _Read only_. Use `Sleeping.set` to set.
     *
     * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
     *
     * @readOnly
     * @property isSleeping
     * @type boolean
     * @default false
     */

    /**
     * _Read only_. Calculated during engine update only when sleeping is enabled.
     *
     * A `Number` that loosely measures the amount of movement a body currently has.
     *
     * Derived from `body.speed^2 + body.angularSpeed^2`. See `Sleeping.update`.
     *
     * @readOnly
     * @property motion
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the length of time during which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
     *
     * @property sleepThreshold
     * @type number
     * @default 60
     */

    /**
     * _Read only_. Use `Body.setDensity` to set.
     *
     * A `Number` that defines the density of the body (mass per unit area).
     *
     * Mass will also be updated when set.
     *
     * @readOnly
     * @property density
     * @type number
     * @default 0.001
     */

    /**
     * _Read only_. Use `Body.setMass` to set.
     *
     * A `Number` that defines the mass of the body.
     *
     * Density will also be updated when set.
     *
     * @readOnly
     * @property mass
     * @type number
     */

    /**
     * _Read only_. Use `Body.setMass` to set.
     *
     * A `Number` that defines the inverse mass of the body (`1 / mass`).
     *
     * @readOnly
     * @property inverseMass
     * @type number
     */

    /**
     * _Read only_. Automatically calculated when vertices, mass or density are set or set through `Body.setInertia`.
     *
     * A `Number` that defines the moment of inertia of the body. This is the second moment of area in two dimensions.
     *
     * Can be manually set to `Infinity` to prevent rotation of the body. See `Body.setInertia`.
     *
     * @readOnly
     * @property inertia
     * @type number
     */

    /**
     * _Read only_. Automatically calculated when vertices, mass or density are set or calculated by `Body.setInertia`.
     *
     * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
     *
     * @readOnly
     * @property inverseInertia
     * @type number
     */

    /**
     * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur.
     * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
     * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
     *
     * `Math.max(bodyA.restitution, bodyB.restitution)`
     *
     * @property restitution
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means that the body may slide indefinitely.
     * A value of `1` means the body may come to a stop almost instantly after a force is applied.
     *
     * The effects of the value may be non-linear.
     * High values may be unstable depending on the body.
     * The engine uses a Coulomb friction model including static and kinetic friction.
     * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
     *
     * `Math.min(bodyA.friction, bodyB.friction)`
     *
     * @property friction
     * @type number
     * @default 0.1
     */

    /**
     * A `Number` that defines the static friction of the body (in the Coulomb friction model).
     * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
     * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
     * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
     *
     * @property frictionStatic
     * @type number
     * @default 0.5
     */

    /**
     * A `Number` that defines the air friction of the body (air resistance).
     * A value of `0` means the body will never slow as it moves through space.
     * The higher the value, the faster a body slows when moving through space.
     * The effects of the value are non-linear.
     *
     * @property frictionAir
     * @type number
     * @default 0.01
     */

    /**
     * An `Object` that specifies the collision filtering properties of this body.
     *
     * Collisions between two bodies will obey the following rules:
     * - If the two bodies have the same non-zero value of `collisionFilter.group`,
     *   they will always collide if the value is positive, and they will never collide
     *   if the value is negative.
     * - If the two bodies have different values of `collisionFilter.group` or if one
     *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
     *
     * Each body belongs to a collision category, given by `collisionFilter.category`. This
     * value is used as a bit field and the category should have only one bit set, meaning that
     * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
     * different collision categories available.
     *
     * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
     * the categories it collides with (the value is the bitwise AND value of all these categories).
     *
     * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
     * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
     * are both true.
     *
     * @property collisionFilter
     * @type object
     */

    /**
     * An Integer `Number`, that specifies the collision group this body belongs to.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.group
     * @type object
     * @default 0
     */

    /**
     * A bit field that specifies the collision category this body belongs to.
     * The category value should have only one bit set, for example `0x0001`.
     * This means there are up to 32 unique collision categories available.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.category
     * @type object
     * @default 1
     */

    /**
     * A bit mask that specifies the collision categories this body may collide with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.mask
     * @type object
     * @default -1
     */

    /**
     * A `Number` that specifies a thin boundary around the body where it is allowed to slightly sink into other bodies.
     *
     * This is required for proper collision response, including friction and restitution effects.
     *
     * The default should generally suffice in most cases. You may need to decrease this value for very small bodies that are nearing the default value in scale.
     *
     * @property slop
     * @type number
     * @default 0.05
     */

    /**
     * A `Number` that specifies per-body time scaling.
     *
     * @property timeScale
     * @type number
     * @default 1
     */

    /**
     * _Read only_. Updated during engine update.
     *
     * A `Number` that records the last delta time value used to update this body.
     * Used to calculate speed and velocity.
     *
     * @readOnly
     * @property deltaTime
     * @type number
     * @default 1000 / 60
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the body should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * Sets the opacity to use when rendering.
     *
     * @property render.opacity
     * @type number
     * @default 1
     */

    /**
     * An `Object` that defines the sprite properties to use when rendering, if any.
     *
     * @property render.sprite
     * @type object
     */

    /**
     * An `String` that defines the path to the image to use as the sprite texture, if any.
     *
     * @property render.sprite.texture
     * @type string
     */

    /**
     * A `Number` that defines the scaling in the x-axis for the sprite, if any.
     *
     * @property render.sprite.xScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that defines the scaling in the y-axis for the sprite, if any.
     *
     * @property render.sprite.yScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that defines the offset in the x-axis for the sprite (normalised by texture width).
     *
     * @property render.sprite.xOffset
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the offset in the y-axis for the sprite (normalised by texture height).
     *
     * @property render.sprite.yOffset
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the line width to use when rendering the body outline (if a sprite is not defined).
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 0
     */

    /**
     * A `String` that defines the fill style to use when rendering the body (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.fillStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the stroke style to use when rendering the body outline (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * _Read only_. Calculated automatically when vertices are set.
     *
     * An array of unique axis vectors (edge normals) used for collision detection.
     * These are automatically calculated when vertices are set.
     * They are constantly updated by `Body.update` during the simulation.
     *
     * @readOnly
     * @property axes
     * @type vector[]
     */

    /**
     * _Read only_. Calculated automatically when vertices are set.
     *
     * A `Number` that measures the area of the body's convex hull.
     *
     * @readOnly
     * @property area
     * @type string
     * @default
     */

    /**
     * A `Bounds` object that defines the AABB region for the body.
     * It is automatically calculated when vertices are set and constantly updated by `Body.update` during simulation.
     *
     * @property bounds
     * @type bounds
     */

    /**
     * Temporarily may hold parameters to be passed to `Vertices.chamfer` where supported by external functions.
     *
     * See `Vertices.chamfer` for possible parameters this object may hold.
     *
     * Currently only functions inside `Matter.Bodies` provide a utility using this property as a vertices pre-processing option.
     *
     * Alternatively consider using `Vertices.chamfer` directly on vertices before passing them to a body creation function.
     *
     * @property chamfer
     * @type object|null|undefined
     */
};

module.exports = init;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Body = __webpack_require__(4);
var Events = __webpack_require__(6);
var Common = __webpack_require__(0);

/**
 * The `Matter.Sleeping` module contains methods to manage the sleeping state of bodies.
 *
 * @class Sleeping
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Sleeping) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Sleeping = {};

    var Sleeping = global.Matter.Sleeping;

    // Body();
    Events();
    Common();

    Sleeping._motionWakeThreshold = 0.18;
    Sleeping._motionSleepThreshold = 0.08;
    Sleeping._minBias = 0.9;

    /**
     * Puts bodies to sleep or wakes them up depending on their motion.
     * @method update
     * @param {body[]} bodies
     * @param {number} delta
     */
    Sleeping.update = function (bodies, delta) {
        var timeScale = delta / global.Matter.Common._baseDelta,
            motionSleepThreshold = Sleeping._motionSleepThreshold;

        // update bodies sleeping status
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                speed = global.Matter.Body.getSpeed(body),
                angularSpeed = global.Matter.Body.getAngularSpeed(body),
                motion = speed * speed + angularSpeed * angularSpeed;

            // wake up bodies if they have a force applied
            if (body.force.x !== 0 || body.force.y !== 0) {
                Sleeping.set(body, false);
                continue;
            }

            var minMotion = Math.min(body.motion, motion),
                maxMotion = Math.max(body.motion, motion);

            // biased average motion estimation between frames
            body.motion =
                Sleeping._minBias * minMotion +
                (1 - Sleeping._minBias) * maxMotion;

            if (body.sleepThreshold > 0 && body.motion < motionSleepThreshold) {
                body.sleepCounter += 1;

                if (body.sleepCounter >= body.sleepThreshold / timeScale) {
                    Sleeping.set(body, true);
                }
            } else if (body.sleepCounter > 0) {
                body.sleepCounter -= 1;
            }
        }
    };

    /**
     * Given a set of colliding pairs, wakes the sleeping bodies involved.
     * @method afterCollisions
     * @param {pair[]} pairs
     */
    Sleeping.afterCollisions = function (pairs) {
        var motionSleepThreshold = Sleeping._motionSleepThreshold;

        // wake up bodies involved in collisions
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];

            // don't wake inactive pairs
            if (!pair.isActive) continue;

            var collision = pair.collision,
                bodyA = collision.bodyA.parent,
                bodyB = collision.bodyB.parent;

            // don't wake if at least one body is static
            if (
                (bodyA.isSleeping && bodyB.isSleeping) ||
                bodyA.isStatic ||
                bodyB.isStatic
            )
                continue;

            if (bodyA.isSleeping || bodyB.isSleeping) {
                var sleepingBody =
                        bodyA.isSleeping && !bodyA.isStatic ? bodyA : bodyB,
                    movingBody = sleepingBody === bodyA ? bodyB : bodyA;

                if (
                    !sleepingBody.isStatic &&
                    movingBody.motion > motionSleepThreshold
                ) {
                    Sleeping.set(sleepingBody, false);
                }
            }
        }
    };

    /**
     * Set a body as sleeping or awake.
     * @method set
     * @param {body} body
     * @param {boolean} isSleeping
     */
    Sleeping.set = function (body, isSleeping) {
        var wasSleeping = body.isSleeping;

        if (isSleeping) {
            body.isSleeping = true;
            body.sleepCounter = body.sleepThreshold;

            body.positionImpulse.x = 0;
            body.positionImpulse.y = 0;

            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;

            body.anglePrev = body.angle;
            body.speed = 0;
            body.angularSpeed = 0;
            body.motion = 0;

            if (!wasSleeping) {
                global.Matter.Events.trigger(body, 'sleepStart');
            }
        } else {
            body.isSleeping = false;
            body.sleepCounter = 0;

            if (wasSleeping) {
                global.Matter.Events.trigger(body, 'sleepEnd');
            }
        }
    };
};

module.exports = init;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Common = __webpack_require__(0);

/**
 * The `Matter.Events` module contains methods to fire and listen to events on other objects.
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Events
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Events) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Events = {};

    var Events = global.Matter.Events;

    Common();

    /**
     * Subscribes a callback function to the given object's `eventName`.
     * @method on
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.on = function (object, eventNames, callback) {
        var names = eventNames.split(' '),
            name;

        for (var i = 0; i < names.length; i++) {
            name = names[i];
            object.events = object.events || {};
            object.events[name] = object.events[name] || [];
            object.events[name].push(callback);
        }

        return callback;
    };

    /**
     * Removes the given event callback. If no callback, clears all callbacks in `eventNames`. If no `eventNames`, clears all events.
     * @method off
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.off = function (object, eventNames, callback) {
        if (!eventNames) {
            object.events = {};
            return;
        }

        // handle Events.off(object, callback)
        if (typeof eventNames === 'function') {
            callback = eventNames;
            eventNames = global.Matter.Common.keys(object.events).join(' ');
        }

        var names = eventNames.split(' ');

        for (var i = 0; i < names.length; i++) {
            var callbacks = object.events[names[i]],
                newCallbacks = [];

            if (callback && callbacks) {
                for (var j = 0; j < callbacks.length; j++) {
                    if (callbacks[j] !== callback)
                        newCallbacks.push(callbacks[j]);
                }
            }

            object.events[names[i]] = newCallbacks;
        }
    };

    /**
     * Fires all the callbacks subscribed to the given object's `eventName`, in the order they subscribed, if any.
     * @method trigger
     * @param {} object
     * @param {string} eventNames
     * @param {} event
     */
    Events.trigger = function (object, eventNames, event) {
        var names, name, callbacks, eventClone;

        var events = object.events;

        if (events && global.Matter.Common.keys(events).length > 0) {
            if (!event) event = {};

            names = eventNames.split(' ');

            for (var i = 0; i < names.length; i++) {
                name = names[i];
                callbacks = events[name];

                if (callbacks) {
                    eventClone = global.Matter.Common.clone(event, false);
                    eventClone.name = name;
                    eventClone.source = object;

                    for (var j = 0; j < callbacks.length; j++) {
                        callbacks[j].apply(object, [eventClone]);
                    }
                }
            }
        }
    };
};

module.exports = init;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Events = __webpack_require__(6);
var Common = __webpack_require__(0);
var Bounds = __webpack_require__(3);
var Body = __webpack_require__(4);

/**
 * A composite is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite` objects.
 *
 * They are a container that can represent complex objects made of multiple parts, even if they are not physically connected.
 * A composite could contain anything from a single body all the way up to a whole world.
 *
 * When making any changes to composites, use the included functions rather than changing their properties directly.
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Composite
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Composite) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Composite = {};

    var Composite = global.Matter.Composite;

    Events();
    Common();
    Bounds();
    Body();

    /**
     * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} [options]
     * @return {composite} A new composite
     */
    Composite.create = function (options) {
        return global.Matter.Common.extend(
            {
                id: global.Matter.Common.nextId(),
                type: 'composite',
                parent: null,
                isModified: false,
                bodies: [],
                constraints: [],
                composites: [],
                label: 'Composite',
                plugin: {},
                cache: {
                    allBodies: null,
                    allConstraints: null,
                    allComposites: null,
                },
            },
            options
        );
    };

    /**
     * Sets the composite's `isModified` flag.
     * If `updateParents` is true, all parents will be set (default: false).
     * If `updateChildren` is true, all children will be set (default: false).
     * @private
     * @method setModified
     * @param {composite} composite
     * @param {boolean} isModified
     * @param {boolean} [updateParents=false]
     * @param {boolean} [updateChildren=false]
     */
    Composite.setModified = function (
        composite,
        isModified,
        updateParents,
        updateChildren
    ) {
        composite.isModified = isModified;

        if (isModified && composite.cache) {
            composite.cache.allBodies = null;
            composite.cache.allConstraints = null;
            composite.cache.allComposites = null;
        }

        if (updateParents && composite.parent) {
            Composite.setModified(
                composite.parent,
                isModified,
                updateParents,
                updateChildren
            );
        }

        if (updateChildren) {
            for (var i = 0; i < composite.composites.length; i++) {
                var childComposite = composite.composites[i];
                Composite.setModified(
                    childComposite,
                    isModified,
                    updateParents,
                    updateChildren
                );
            }
        }
    };

    /**
     * Generic single or multi-add function. Adds a single or an array of body(s), constraint(s) or composite(s) to the given composite.
     * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
     * @method add
     * @param {composite} composite
     * @param {object|array} object A single or an array of body(s), constraint(s) or composite(s)
     * @return {composite} The original composite with the objects added
     */
    Composite.add = function (composite, object) {
        var objects = [].concat(object);

        global.Matter.Events.trigger(composite, 'beforeAdd', {
            object: object,
        });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {
                case 'body':
                    // skip adding compound parts
                    if (obj.parent !== obj) {
                        global.Matter.Common.warn(
                            'Composite.add: skipped adding a compound body part (you must add its parent instead)'
                        );
                        break;
                    }

                    Composite.addBody(composite, obj);
                    break;
                case 'constraint':
                    Composite.addConstraint(composite, obj);
                    break;
                case 'composite':
                    Composite.addComposite(composite, obj);
                    break;
                case 'mouseConstraint':
                    Composite.addConstraint(composite, obj.constraint);
                    break;
            }
        }

        global.Matter.Events.trigger(composite, 'afterAdd', { object: object });

        return composite;
    };

    /**
     * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Optionally searching its children recursively.
     * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
     * @method remove
     * @param {composite} composite
     * @param {object|array} object
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the objects removed
     */
    Composite.remove = function (composite, object, deep) {
        var objects = [].concat(object);

        global.Matter.Events.trigger(composite, 'beforeRemove', {
            object: object,
        });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {
                case 'body':
                    Composite.removeBody(composite, obj, deep);
                    break;
                case 'constraint':
                    Composite.removeConstraint(composite, obj, deep);
                    break;
                case 'composite':
                    Composite.removeComposite(composite, obj, deep);
                    break;
                case 'mouseConstraint':
                    Composite.removeConstraint(composite, obj.constraint);
                    break;
            }
        }

        global.Matter.Events.trigger(composite, 'afterRemove', {
            object: object,
        });

        return composite;
    };

    /**
     * Adds a composite to the given composite.
     * @private
     * @method addComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @return {composite} The original compositeA with the objects from compositeB added
     */
    Composite.addComposite = function (compositeA, compositeB) {
        compositeA.composites.push(compositeB);
        compositeB.parent = compositeA;
        Composite.setModified(compositeA, true, true, false);
        return compositeA;
    };

    /**
     * Removes a composite from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @param {boolean} [deep=false]
     * @return {composite} The original compositeA with the composite removed
     */
    Composite.removeComposite = function (compositeA, compositeB, deep) {
        var position = global.Matter.Common.indexOf(
            compositeA.composites,
            compositeB
        );

        if (position !== -1) {
            var bodies = Composite.allBodies(compositeB);

            Composite.removeCompositeAt(compositeA, position);

            for (var i = 0; i < bodies.length; i++) {
                bodies[i].sleepCounter = 0;
            }
        }

        if (deep) {
            for (var i = 0; i < compositeA.composites.length; i++) {
                Composite.removeComposite(
                    compositeA.composites[i],
                    compositeB,
                    true
                );
            }
        }

        return compositeA;
    };

    /**
     * Removes a composite from the given composite.
     * @private
     * @method removeCompositeAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the composite removed
     */
    Composite.removeCompositeAt = function (composite, position) {
        composite.composites.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a body to the given composite.
     * @private
     * @method addBody
     * @param {composite} composite
     * @param {body} body
     * @return {composite} The original composite with the body added
     */
    Composite.addBody = function (composite, body) {
        composite.bodies.push(body);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a body from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeBody
     * @param {composite} composite
     * @param {body} body
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBody = function (composite, body, deep) {
        var position = global.Matter.Common.indexOf(composite.bodies, body);

        if (position !== -1) {
            Composite.removeBodyAt(composite, position);
            body.sleepCounter = 0;
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++) {
                Composite.removeBody(composite.composites[i], body, true);
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite.
     * @private
     * @method removeBodyAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBodyAt = function (composite, position) {
        composite.bodies.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a constraint to the given composite.
     * @private
     * @method addConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @return {composite} The original composite with the constraint added
     */
    Composite.addConstraint = function (composite, constraint) {
        composite.constraints.push(constraint);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a constraint from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraint = function (composite, constraint, deep) {
        var position = global.Matter.Common.indexOf(
            composite.constraints,
            constraint
        );

        if (position !== -1) {
            Composite.removeConstraintAt(composite, position);
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++) {
                Composite.removeConstraint(
                    composite.composites[i],
                    constraint,
                    true
                );
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite.
     * @private
     * @method removeConstraintAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraintAt = function (composite, position) {
        composite.constraints.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes all bodies, constraints and composites from the given composite.
     * Optionally clearing its children recursively.
     * @method clear
     * @param {composite} composite
     * @param {boolean} keepStatic
     * @param {boolean} [deep=false]
     */
    Composite.clear = function (composite, keepStatic, deep) {
        if (deep) {
            for (var i = 0; i < composite.composites.length; i++) {
                Composite.clear(composite.composites[i], keepStatic, true);
            }
        }

        if (keepStatic) {
            composite.bodies = composite.bodies.filter(function (body) {
                return body.isStatic;
            });
        } else {
            composite.bodies.length = 0;
        }

        composite.constraints.length = 0;
        composite.composites.length = 0;

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Returns all bodies in the given composite, including all bodies in its children, recursively.
     * @method allBodies
     * @param {composite} composite
     * @return {body[]} All the bodies
     */
    Composite.allBodies = function (composite) {
        if (composite.cache && composite.cache.allBodies) {
            return composite.cache.allBodies;
        }

        var bodies = [].concat(composite.bodies);

        for (var i = 0; i < composite.composites.length; i++)
            bodies = bodies.concat(
                Composite.allBodies(composite.composites[i])
            );

        if (composite.cache) {
            composite.cache.allBodies = bodies;
        }

        return bodies;
    };

    /**
     * Returns all constraints in the given composite, including all constraints in its children, recursively.
     * @method allConstraints
     * @param {composite} composite
     * @return {constraint[]} All the constraints
     */
    Composite.allConstraints = function (composite) {
        if (composite.cache && composite.cache.allConstraints) {
            return composite.cache.allConstraints;
        }

        var constraints = [].concat(composite.constraints);

        for (var i = 0; i < composite.composites.length; i++)
            constraints = constraints.concat(
                Composite.allConstraints(composite.composites[i])
            );

        if (composite.cache) {
            composite.cache.allConstraints = constraints;
        }

        return constraints;
    };

    /**
     * Returns all composites in the given composite, including all composites in its children, recursively.
     * @method allComposites
     * @param {composite} composite
     * @return {composite[]} All the composites
     */
    Composite.allComposites = function (composite) {
        if (composite.cache && composite.cache.allComposites) {
            return composite.cache.allComposites;
        }

        var composites = [].concat(composite.composites);

        for (var i = 0; i < composite.composites.length; i++)
            composites = composites.concat(
                Composite.allComposites(composite.composites[i])
            );

        if (composite.cache) {
            composite.cache.allComposites = composites;
        }

        return composites;
    };

    /**
     * Searches the composite recursively for an object matching the type and id supplied, null if not found.
     * @method get
     * @param {composite} composite
     * @param {number} id
     * @param {string} type
     * @return {object} The requested object, if found
     */
    Composite.get = function (composite, id, type) {
        var objects, object;

        switch (type) {
            case 'body':
                objects = Composite.allBodies(composite);
                break;
            case 'constraint':
                objects = Composite.allConstraints(composite);
                break;
            case 'composite':
                objects = Composite.allComposites(composite).concat(composite);
                break;
        }

        if (!objects) return null;

        object = objects.filter(function (object) {
            return object.id.toString() === id.toString();
        });

        return object.length === 0 ? null : object[0];
    };

    /**
     * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add).
     * @method move
     * @param {compositeA} compositeA
     * @param {object[]} objects
     * @param {compositeB} compositeB
     * @return {composite} Returns compositeA
     */
    Composite.move = function (compositeA, objects, compositeB) {
        Composite.remove(compositeA, objects);
        Composite.add(compositeB, objects);
        return compositeA;
    };

    /**
     * Assigns new ids for all objects in the composite, recursively.
     * @method rebase
     * @param {composite} composite
     * @return {composite} Returns composite
     */
    Composite.rebase = function (composite) {
        var objects = Composite.allBodies(composite)
            .concat(Composite.allConstraints(composite))
            .concat(Composite.allComposites(composite));

        for (var i = 0; i < objects.length; i++) {
            objects[i].id = global.Matter.Common.nextId();
        }

        return composite;
    };

    /**
     * Translates all children in the composite by a given vector relative to their current positions,
     * without imparting any velocity.
     * @method translate
     * @param {composite} composite
     * @param {vector} translation
     * @param {bool} [recursive=true]
     */
    Composite.translate = function (composite, translation, recursive) {
        var bodies = recursive
            ? Composite.allBodies(composite)
            : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            global.Matter.Body.translate(bodies[i], translation);
        }

        return composite;
    };

    /**
     * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
     * @method rotate
     * @param {composite} composite
     * @param {number} rotation
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.rotate = function (composite, rotation, point, recursive) {
        var cos = Math.cos(rotation),
            sin = Math.sin(rotation),
            bodies = recursive
                ? Composite.allBodies(composite)
                : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;

            global.Matter.Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos),
            });

            global.Matter.Body.rotate(body, rotation);
        }

        return composite;
    };

    /**
     * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
     * @method scale
     * @param {composite} composite
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.scale = function (composite, scaleX, scaleY, point, recursive) {
        var bodies = recursive
            ? Composite.allBodies(composite)
            : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;

            global.Matter.Body.setPosition(body, {
                x: point.x + dx * scaleX,
                y: point.y + dy * scaleY,
            });

            global.Matter.Body.scale(body, scaleX, scaleY);
        }

        return composite;
    };

    /**
     * Returns the union of the bounds of all of the composite's bodies.
     * @method bounds
     * @param {composite} composite The composite.
     * @returns {bounds} The composite bounds.
     */
    Composite.bounds = function (composite) {
        var bodies = Composite.allBodies(composite),
            vertices = [];

        for (var i = 0; i < bodies.length; i += 1) {
            var body = bodies[i];
            vertices.push(body.bounds.min, body.bounds.max);
        }

        return global.Matter.Bounds.create(vertices);
    };

    /*
     *
     *  Events Documentation
     *
     */

    /**
     * Fired when a call to `Composite.add` is made, before objects have been added.
     *
     * @event beforeAdd
     * @param {} event An event object
     * @param {} event.object The object(s) to be added (may be a single body, constraint, composite or a mixed array of these)
     * @param {} event.source The source object of the event
     * @param {} event.name The name of the event
     */

    /**
     * Fired when a call to `Composite.add` is made, after objects have been added.
     *
     * @event afterAdd
     * @param {} event An event object
     * @param {} event.object The object(s) that have been added (may be a single body, constraint, composite or a mixed array of these)
     * @param {} event.source The source object of the event
     * @param {} event.name The name of the event
     */

    /**
     * Fired when a call to `Composite.remove` is made, before objects have been removed.
     *
     * @event beforeRemove
     * @param {} event An event object
     * @param {} event.object The object(s) to be removed (may be a single body, constraint, composite or a mixed array of these)
     * @param {} event.source The source object of the event
     * @param {} event.name The name of the event
     */

    /**
     * Fired when a call to `Composite.remove` is made, after objects have been removed.
     *
     * @event afterRemove
     * @param {} event An event object
     * @param {} event.object The object(s) that have been removed (may be a single body, constraint, composite or a mixed array of these)
     * @param {} event.source The source object of the event
     * @param {} event.name The name of the event
     */

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
     * @default "composite"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage composites.
     *
     * @property label
     * @type string
     * @default "Composite"
     */

    /**
     * A flag that specifies whether the composite has been modified during the current step.
     * This is automatically managed when bodies, constraints or composites are added or removed.
     *
     * @property isModified
     * @type boolean
     * @default false
     */

    /**
     * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
     *
     * @property parent
     * @type composite
     * @default null
     */

    /**
     * An array of `Body` that are _direct_ children of this composite.
     * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
     *
     * @property bodies
     * @type body[]
     * @default []
     */

    /**
     * An array of `Constraint` that are _direct_ children of this composite.
     * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
     *
     * @property constraints
     * @type constraint[]
     * @default []
     */

    /**
     * An array of `Composite` that are _direct_ children of this composite.
     * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
     *
     * @property composites
     * @type composite[]
     * @default []
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * An object used for storing cached results for performance reasons.
     * This is used internally only and is automatically managed.
     *
     * @private
     * @property cache
     * @type {}
     */
};

module.exports = init;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Vector = __webpack_require__(1);
var Common = __webpack_require__(0);

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Axes) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Axes = {};
    Vector();
    Common();

    /**
     * Creates a new set of axes from the given vertices.
     * @method fromVertices
     * @param {vertices} vertices
     * @return {axes} A new axes from the given vertices
     */
    global.Matter.Axes.fromVertices = function (vertices) {
        var axes = {};

        // find the unique axes, using edge normal gradients
        for (var i = 0; i < vertices.length; i++) {
            var j = (i + 1) % vertices.length,
                normal = global.Matter.Vector.normalise({
                    x: vertices[j].y - vertices[i].y,
                    y: vertices[i].x - vertices[j].x,
                }),
                gradient = normal.y === 0 ? Infinity : normal.x / normal.y;

            // limit precision
            gradient = gradient.toFixed(3).toString();
            axes[gradient] = normal;
        }

        return global.Matter.Common.values(axes);
    };

    /**
     * Rotates a set of axes by the given angle.
     * @method rotate
     * @param {axes} axes
     * @param {number} angle
     */
    global.Matter.Axes.rotate = function (axes, angle) {
        if (angle === 0) return;

        var cos = Math.cos(angle),
            sin = Math.sin(angle);

        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i],
                xx;
            xx = axis.x * cos - axis.y * sin;
            axis.y = axis.x * sin + axis.y * cos;
            axis.x = xx;
        }
    };
};

module.exports = init;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Vertices = __webpack_require__(2);
var Common = __webpack_require__(0);
var Body = __webpack_require__(4);
var Bounds = __webpack_require__(3);
var Vector = __webpack_require__(1);

/**
 * The `Matter.Bodies` module contains factory methods for creating rigid body models
 * with commonly used body configurations (such as rectangles, circles and other polygons).
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Bodies
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Bodies) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Bodies = {};

    var Bodies = global.Matter.Bodies;

    Vertices();
    Common();
    Body();
    Bounds();
    Vector();

    /**
     * Creates a new rigid body model with a rectangle hull.
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method rectangle
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {object} [options]
     * @return {body} A new rectangle body
     */
    Bodies.rectangle = function (x, y, width, height, options) {
        options = options || {};

        var rectangle = {
            label: 'Rectangle Body',
            position: { x: x, y: y },
            vertices: global.Matter.Vertices.fromPath(
                'L 0 0 L ' +
                    width +
                    ' 0 L ' +
                    width +
                    ' ' +
                    height +
                    ' L 0 ' +
                    height
            ),
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            rectangle.vertices = global.Matter.Vertices.chamfer(
                rectangle.vertices,
                chamfer.radius,
                chamfer.quality,
                chamfer.qualityMin,
                chamfer.qualityMax
            );
            delete options.chamfer;
        }

        return global.Matter.Body.create({ ...rectangle, ...options });
    };

    /**
     * Creates a new rigid body model with a trapezoid hull.
     * The `slope` is parameterised as a fraction of `width` and must be < 1 to form a valid trapezoid.
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method trapezoid
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} slope Must be a number < 1.
     * @param {object} [options]
     * @return {body} A new trapezoid body
     */
    Bodies.trapezoid = function (x, y, width, height, slope, options) {
        options = options || {};

        if (slope >= 1) {
            global.Matter.Common.warn(
                'Bodies.trapezoid: slope parameter must be < 1.'
            );
        }

        slope *= 0.5;
        var roof = (1 - slope * 2) * width;

        var x1 = width * slope,
            x2 = x1 + roof,
            x3 = x2 + x1,
            verticesPath;

        if (slope < 0.5) {
            verticesPath =
                'L 0 0 L ' +
                x1 +
                ' ' +
                -height +
                ' L ' +
                x2 +
                ' ' +
                -height +
                ' L ' +
                x3 +
                ' 0';
        } else {
            verticesPath = 'L 0 0 L ' + x2 + ' ' + -height + ' L ' + x3 + ' 0';
        }

        var trapezoid = {
            label: 'Trapezoid Body',
            position: { x: x, y: y },
            vertices: global.Matter.Vertices.fromPath(verticesPath),
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            trapezoid.vertices = global.Matter.Vertices.chamfer(
                trapezoid.vertices,
                chamfer.radius,
                chamfer.quality,
                chamfer.qualityMin,
                chamfer.qualityMax
            );
            delete options.chamfer;
        }

        return global.Matter.Body.create(
            global.Matter.Common.extend({}, trapezoid, options)
        );
    };

    /**
     * Creates a new rigid body model with a circle hull.
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method circle
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {object} [options]
     * @param {number} [maxSides]
     * @return {body} A new circle body
     */
    Bodies.circle = function (x, y, radius, options, maxSides) {
        options = options || {};

        var circle = {
            label: 'Circle Body',
            circleRadius: radius,
        };

        // approximate circles with polygons until true circles implemented in SAT
        maxSides = maxSides || 25;
        var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));

        // optimisation: always use even number of sides (half the number of unique axes)
        if (sides % 2 === 1) sides += 1;

        return Bodies.polygon(
            x,
            y,
            sides,
            radius,
            global.Matter.Common.extend({}, circle, options)
        );
    };

    /**
     * Creates a new rigid body model with a regular polygon hull with the given number of sides.
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method polygon
     * @param {number} x
     * @param {number} y
     * @param {number} sides
     * @param {number} radius
     * @param {object} [options]
     * @return {body} A new regular polygon body
     */
    Bodies.polygon = function (x, y, sides, radius, options) {
        options = options || {};

        if (sides < 3) return Bodies.circle(x, y, radius, options);

        var theta = (2 * Math.PI) / sides,
            path = '',
            offset = theta * 0.5;

        for (var i = 0; i < sides; i += 1) {
            var angle = offset + i * theta,
                xx = Math.cos(angle) * radius,
                yy = Math.sin(angle) * radius;

            path += 'L ' + xx.toFixed(3) + ' ' + yy.toFixed(3) + ' ';
        }

        var polygon = {
            label: 'Polygon Body',
            position: { x: x, y: y },
            vertices: global.Matter.Vertices.fromPath(path),
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            polygon.vertices = global.Matter.Vertices.chamfer(
                polygon.vertices,
                chamfer.radius,
                chamfer.quality,
                chamfer.qualityMin,
                chamfer.qualityMax
            );
            delete options.chamfer;
        }

        return global.Matter.Body.create(
            global.Matter.Common.extend({}, polygon, options)
        );
    };

    /**
     * Utility to create a compound body based on set(s) of vertices.
     *
     * _Note:_ To optionally enable automatic concave vertices decomposition the [poly-decomp](https://github.com/schteppe/poly-decomp.js)
     * package must be first installed and provided see `Common.setDecomp`, otherwise the convex hull of each vertex set will be used.
     *
     * The resulting vertices are reorientated about their centre of mass,
     * and offset such that `body.position` corresponds to this point.
     *
     * The resulting offset may be found if needed by subtracting `body.bounds` from the original input bounds.
     * To later move the centre of mass see `Body.setCentre`.
     *
     * Note that automatic conconcave decomposition results are not always optimal.
     * For best results, simplify the input vertices as much as possible first.
     * By default this function applies some addtional simplification to help.
     *
     * Some outputs may also require further manual processing afterwards to be robust.
     * In particular some parts may need to be overlapped to avoid collision gaps.
     * Thin parts and sharp points should be avoided or removed where possible.
     *
     * The options parameter object specifies any `Matter.Body` properties you wish to override the defaults.
     *
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method fromVertices
     * @param {number} x
     * @param {number} y
     * @param {array} vertexSets One or more arrays of vertex points e.g. `[[{ x: 0, y: 0 }...], ...]`.
     * @param {object} [options] The body options.
     * @param {bool} [flagInternal=false] Optionally marks internal edges with `isInternal`.
     * @param {number} [removeCollinear=0.01] Threshold when simplifying vertices along the same edge.
     * @param {number} [minimumArea=10] Threshold when removing small parts.
     * @param {number} [removeDuplicatePoints=0.01] Threshold when simplifying nearby vertices.
     * @return {body}
     */
    Bodies.fromVertices = function (
        x,
        y,
        vertexSets,
        options,
        flagInternal,
        removeCollinear,
        minimumArea,
        removeDuplicatePoints
    ) {
        var decomp = global.Matter.Common.getDecomp(),
            canDecomp,
            body,
            parts,
            isConvex,
            isConcave,
            vertices,
            i,
            j,
            k,
            v,
            z;

        // check decomp is as expected
        canDecomp = Boolean(decomp && decomp.quickDecomp);

        options = options || {};
        parts = [];

        flagInternal =
            typeof flagInternal !== 'undefined' ? flagInternal : false;
        removeCollinear =
            typeof removeCollinear !== 'undefined' ? removeCollinear : 0.01;
        minimumArea = typeof minimumArea !== 'undefined' ? minimumArea : 10;
        removeDuplicatePoints =
            typeof removeDuplicatePoints !== 'undefined'
                ? removeDuplicatePoints
                : 0.01;

        // ensure vertexSets is an array of arrays
        if (!global.Matter.Common.isArray(vertexSets[0])) {
            vertexSets = [vertexSets];
        }

        for (v = 0; v < vertexSets.length; v += 1) {
            vertices = vertexSets[v];
            isConvex = global.Matter.Vertices.isConvex(vertices);
            isConcave = !isConvex;

            if (isConcave && !canDecomp) {
                global.Matter.Common.warnOnce(
                    "Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."
                );
            }

            if (isConvex || !canDecomp) {
                if (isConvex) {
                    vertices = global.Matter.Vertices.clockwiseSort(vertices);
                } else {
                    // fallback to convex hull when decomposition is not possible
                    vertices = global.Matter.Vertices.hull(vertices);
                }

                parts.push({
                    position: { x: x, y: y },
                    vertices: vertices,
                });
            } else {
                // initialise a decomposition
                var concave = vertices.map(function (vertex) {
                    return [vertex.x, vertex.y];
                });

                // vertices are concave and simple, we can decompose into parts
                decomp.makeCCW(concave);
                if (removeCollinear !== false)
                    decomp.removeCollinearPoints(concave, removeCollinear);
                if (
                    removeDuplicatePoints !== false &&
                    decomp.removeDuplicatePoints
                )
                    decomp.removeDuplicatePoints(
                        concave,
                        removeDuplicatePoints
                    );

                // use the quick decomposition algorithm (Bayazit)
                var decomposed = decomp.quickDecomp(concave);

                // for each decomposed chunk
                for (i = 0; i < decomposed.length; i++) {
                    var chunk = decomposed[i];

                    // convert vertices into the correct structure
                    var chunkVertices = chunk.map(function (vertices) {
                        return {
                            x: vertices[0],
                            y: vertices[1],
                        };
                    });

                    // skip small chunks
                    if (
                        minimumArea > 0 &&
                        global.Matter.Vertices.area(chunkVertices) < minimumArea
                    )
                        continue;

                    // create a compound part
                    parts.push({
                        position: global.Matter.Vertices.centre(chunkVertices),
                        vertices: chunkVertices,
                    });
                }
            }
        }

        // create body parts
        for (i = 0; i < parts.length; i++) {
            parts[i] = global.Matter.Body.create(
                global.Matter.Common.extend(parts[i], options)
            );
        }

        // flag internal edges (coincident part edges)
        if (flagInternal) {
            var coincident_max_dist = 5;

            for (i = 0; i < parts.length; i++) {
                var partA = parts[i];

                for (j = i + 1; j < parts.length; j++) {
                    var partB = parts[j];

                    if (
                        global.Matter.Bounds.overlaps(
                            partA.bounds,
                            partB.bounds
                        )
                    ) {
                        var pav = partA.vertices,
                            pbv = partB.vertices;

                        // iterate vertices of both parts
                        for (k = 0; k < partA.vertices.length; k++) {
                            for (z = 0; z < partB.vertices.length; z++) {
                                // find distances between the vertices
                                var da = global.Matter.Vector.magnitudeSquared(
                                        global.Matter.Vector.sub(
                                            pav[(k + 1) % pav.length],
                                            pbv[z]
                                        )
                                    ),
                                    db = global.Matter.Vector.magnitudeSquared(
                                        global.Matter.Vector.sub(
                                            pav[k],
                                            pbv[(z + 1) % pbv.length]
                                        )
                                    );

                                // if both vertices are very close, consider the edge concident (internal)
                                if (
                                    da < coincident_max_dist &&
                                    db < coincident_max_dist
                                ) {
                                    pav[k].isInternal = true;
                                    pbv[z].isInternal = true;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (parts.length > 1) {
            // create the parent body to be returned, that contains generated compound parts
            body = global.Matter.Body.create(
                global.Matter.Common.extend({ parts: parts.slice(0) }, options)
            );

            // offset such that body.position is at the centre off mass
            global.Matter.Body.setPosition(body, { x: x, y: y });

            return body;
        } else {
            return parts[0];
        }
    };
};

module.exports = init;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Vertices = __webpack_require__(2);
var Pair = __webpack_require__(11);

/**
 * The `Matter.Collision` module contains methods for detecting collisions between a given pair of bodies.
 *
 * For efficient detection between a list of bodies, see `Matter.Detector` and `Matter.Query`.
 *
 * See `Matter.Engine` for collision events.
 *
 * @class Collision
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Collision) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Collision = {};

    var Collision = global.Matter.Collision;

    Vertices();
    Pair();

    var _supports = [];

    var _overlapAB = {
        overlap: 0,
        axis: null,
    };

    var _overlapBA = {
        overlap: 0,
        axis: null,
    };

    /**
     * Creates a new collision record.
     * @method create
     * @param {body} bodyA The first body part represented by the collision record
     * @param {body} bodyB The second body part represented by the collision record
     * @return {collision} A new collision record
     */
    Collision.create = function (bodyA, bodyB) {
        return {
            pair: null,
            collided: false,
            bodyA: bodyA,
            bodyB: bodyB,
            parentA: bodyA.parent,
            parentB: bodyB.parent,
            depth: 0,
            normal: { x: 0, y: 0 },
            tangent: { x: 0, y: 0 },
            penetration: { x: 0, y: 0 },
            supports: [null, null],
            supportCount: 0,
        };
    };

    /**
     * Detect collision between two bodies.
     * @method collides
     * @param {body} bodyA
     * @param {body} bodyB
     * @param {pairs} [pairs] Optionally reuse collision records from existing pairs.
     * @return {collision|null} A collision record if detected, otherwise null
     */
    Collision.collides = function (bodyA, bodyB, pairs) {
        Collision._overlapAxes(
            _overlapAB,
            bodyA.vertices,
            bodyB.vertices,
            bodyA.axes
        );

        if (_overlapAB.overlap <= 0) {
            return null;
        }

        Collision._overlapAxes(
            _overlapBA,
            bodyB.vertices,
            bodyA.vertices,
            bodyB.axes
        );

        if (_overlapBA.overlap <= 0) {
            return null;
        }

        // reuse collision records for gc efficiency
        var pair = pairs && pairs.table[global.Matter.Pair.id(bodyA, bodyB)],
            collision;

        if (!pair) {
            collision = Collision.create(bodyA, bodyB);
            collision.collided = true;
            collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
            collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
            collision.parentA = collision.bodyA.parent;
            collision.parentB = collision.bodyB.parent;
        } else {
            collision = pair.collision;
        }

        bodyA = collision.bodyA;
        bodyB = collision.bodyB;

        var minOverlap;

        if (_overlapAB.overlap < _overlapBA.overlap) {
            minOverlap = _overlapAB;
        } else {
            minOverlap = _overlapBA;
        }

        var normal = collision.normal,
            tangent = collision.tangent,
            penetration = collision.penetration,
            supports = collision.supports,
            depth = minOverlap.overlap,
            minAxis = minOverlap.axis,
            normalX = minAxis.x,
            normalY = minAxis.y,
            deltaX = bodyB.position.x - bodyA.position.x,
            deltaY = bodyB.position.y - bodyA.position.y;

        // ensure normal is facing away from bodyA
        if (normalX * deltaX + normalY * deltaY >= 0) {
            normalX = -normalX;
            normalY = -normalY;
        }

        normal.x = normalX;
        normal.y = normalY;

        tangent.x = -normalY;
        tangent.y = normalX;

        penetration.x = normalX * depth;
        penetration.y = normalY * depth;

        collision.depth = depth;

        // find support points, there is always either exactly one or two
        var supportsB = Collision._findSupports(bodyA, bodyB, normal, 1),
            supportCount = 0;

        // find the supports from bodyB that are inside bodyA
        if (global.Matter.Vertices.contains(bodyA.vertices, supportsB[0])) {
            supports[supportCount++] = supportsB[0];
        }

        if (global.Matter.Vertices.contains(bodyA.vertices, supportsB[1])) {
            supports[supportCount++] = supportsB[1];
        }

        // find the supports from bodyA that are inside bodyB
        if (supportCount < 2) {
            var supportsA = Collision._findSupports(bodyB, bodyA, normal, -1);

            if (global.Matter.Vertices.contains(bodyB.vertices, supportsA[0])) {
                supports[supportCount++] = supportsA[0];
            }

            if (
                supportCount < 2 &&
                global.Matter.Vertices.contains(bodyB.vertices, supportsA[1])
            ) {
                supports[supportCount++] = supportsA[1];
            }
        }

        // account for the edge case of overlapping but no vertex containment
        if (supportCount === 0) {
            supports[supportCount++] = supportsB[0];
        }

        // update support count
        collision.supportCount = supportCount;

        return collision;
    };

    /**
     * Find the overlap between two sets of vertices.
     * @method _overlapAxes
     * @private
     * @param {object} result
     * @param {vertices} verticesA
     * @param {vertices} verticesB
     * @param {axes} axes
     */
    Collision._overlapAxes = function (result, verticesA, verticesB, axes) {
        var verticesALength = verticesA.length,
            verticesBLength = verticesB.length,
            verticesAX = verticesA[0].x,
            verticesAY = verticesA[0].y,
            verticesBX = verticesB[0].x,
            verticesBY = verticesB[0].y,
            axesLength = axes.length,
            overlapMin = Number.MAX_VALUE,
            overlapAxisNumber = 0,
            overlap,
            overlapAB,
            overlapBA,
            dot,
            i,
            j;

        for (i = 0; i < axesLength; i++) {
            var axis = axes[i],
                axisX = axis.x,
                axisY = axis.y,
                minA = verticesAX * axisX + verticesAY * axisY,
                minB = verticesBX * axisX + verticesBY * axisY,
                maxA = minA,
                maxB = minB;

            for (j = 1; j < verticesALength; j += 1) {
                dot = verticesA[j].x * axisX + verticesA[j].y * axisY;

                if (dot > maxA) {
                    maxA = dot;
                } else if (dot < minA) {
                    minA = dot;
                }
            }

            for (j = 1; j < verticesBLength; j += 1) {
                dot = verticesB[j].x * axisX + verticesB[j].y * axisY;

                if (dot > maxB) {
                    maxB = dot;
                } else if (dot < minB) {
                    minB = dot;
                }
            }

            overlapAB = maxA - minB;
            overlapBA = maxB - minA;
            overlap = overlapAB < overlapBA ? overlapAB : overlapBA;

            if (overlap < overlapMin) {
                overlapMin = overlap;
                overlapAxisNumber = i;

                if (overlap <= 0) {
                    // can not be intersecting
                    break;
                }
            }
        }

        result.axis = axes[overlapAxisNumber];
        result.overlap = overlapMin;
    };

    /**
     * Finds supporting vertices given two bodies along a given direction using hill-climbing.
     * @method _findSupports
     * @private
     * @param {body} bodyA
     * @param {body} bodyB
     * @param {vector} normal
     * @param {number} direction
     * @return [vector]
     */
    Collision._findSupports = function (bodyA, bodyB, normal, direction) {
        var vertices = bodyB.vertices,
            verticesLength = vertices.length,
            bodyAPositionX = bodyA.position.x,
            bodyAPositionY = bodyA.position.y,
            normalX = normal.x * direction,
            normalY = normal.y * direction,
            vertexA = vertices[0],
            vertexB = vertexA,
            nearestDistance =
                normalX * (bodyAPositionX - vertexB.x) +
                normalY * (bodyAPositionY - vertexB.y),
            vertexC,
            distance,
            j;

        // find deepest vertex relative to the axis
        for (j = 1; j < verticesLength; j += 1) {
            vertexB = vertices[j];
            distance =
                normalX * (bodyAPositionX - vertexB.x) +
                normalY * (bodyAPositionY - vertexB.y);

            // convex hill-climbing
            if (distance < nearestDistance) {
                nearestDistance = distance;
                vertexA = vertexB;
            }
        }

        // measure next vertex
        vertexC =
            vertices[(verticesLength + vertexA.index - 1) % verticesLength];
        nearestDistance =
            normalX * (bodyAPositionX - vertexC.x) +
            normalY * (bodyAPositionY - vertexC.y);

        // compare with previous vertex
        vertexB = vertices[(vertexA.index + 1) % verticesLength];
        if (
            normalX * (bodyAPositionX - vertexB.x) +
                normalY * (bodyAPositionY - vertexB.y) <
            nearestDistance
        ) {
            _supports[0] = vertexA;
            _supports[1] = vertexB;

            return _supports;
        }

        _supports[0] = vertexA;
        _supports[1] = vertexC;

        return _supports;
    };

    /*
     *
     *  Properties Documentation
     *
     */

    /**
     * A reference to the pair using this collision record, if there is one.
     *
     * @property pair
     * @type {pair|null}
     * @default null
     */

    /**
     * A flag that indicates if the bodies were colliding when the collision was last updated.
     *
     * @property collided
     * @type boolean
     * @default false
     */

    /**
     * The first body part represented by the collision (see also `collision.parentA`).
     *
     * @property bodyA
     * @type body
     */

    /**
     * The second body part represented by the collision (see also `collision.parentB`).
     *
     * @property bodyB
     * @type body
     */

    /**
     * The first body represented by the collision (i.e. `collision.bodyA.parent`).
     *
     * @property parentA
     * @type body
     */

    /**
     * The second body represented by the collision (i.e. `collision.bodyB.parent`).
     *
     * @property parentB
     * @type body
     */

    /**
     * A `Number` that represents the minimum separating distance between the bodies along the collision normal.
     *
     * @readOnly
     * @property depth
     * @type number
     * @default 0
     */

    /**
     * A normalised `Vector` that represents the direction between the bodies that provides the minimum separating distance.
     *
     * @property normal
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A normalised `Vector` that is the tangent direction to the collision normal.
     *
     * @property tangent
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that represents the direction and depth of the collision.
     *
     * @property penetration
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * An array of body vertices that represent the support points in the collision.
     *
     * _Note:_ Only the first `collision.supportCount` items of `collision.supports` are active.
     * Therefore use `collision.supportCount` instead of `collision.supports.length` when iterating the active supports.
     *
     * These are the deepest vertices (along the collision normal) of each body that are contained by the other body's vertices.
     *
     * @property supports
     * @type vector[]
     * @default []
     */

    /**
     * The number of active supports for this collision found in `collision.supports`.
     *
     * _Note:_ Only the first `collision.supportCount` items of `collision.supports` are active.
     * Therefore use `collision.supportCount` instead of `collision.supports.length` when iterating the active supports.
     *
     * @property supportCount
     * @type number
     * @default 0
     */
};

module.exports = init;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Contact = __webpack_require__(14);

/**
 * The `Matter.Pair` module contains methods for creating and manipulating collision pairs.
 *
 * @class Pair
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Pair) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Pair = {};

    var Pair = global.Matter.Pair;

    Contact();

    /**
     * Creates a pair.
     * @method create
     * @param {collision} collision
     * @param {number} timestamp
     * @return {pair} A new pair
     */
    Pair.create = function (collision, timestamp) {
        var bodyA = collision.bodyA,
            bodyB = collision.bodyB;

        var pair = {
            id: Pair.id(bodyA, bodyB),
            bodyA: bodyA,
            bodyB: bodyB,
            collision: collision,
            contacts: [
                global.Matter.Contact.create(),
                global.Matter.Contact.create(),
            ],
            contactCount: 0,
            separation: 0,
            isActive: true,
            isSensor: bodyA.isSensor || bodyB.isSensor,
            timeCreated: timestamp,
            timeUpdated: timestamp,
            inverseMass: 0,
            friction: 0,
            frictionStatic: 0,
            restitution: 0,
            slop: 0,
        };

        Pair.update(pair, collision, timestamp);

        return pair;
    };

    /**
     * Updates a pair given a collision.
     * @method update
     * @param {pair} pair
     * @param {collision} collision
     * @param {number} timestamp
     */
    Pair.update = function (pair, collision, timestamp) {
        var supports = collision.supports,
            supportCount = collision.supportCount,
            contacts = pair.contacts,
            parentA = collision.parentA,
            parentB = collision.parentB;

        pair.isActive = true;
        pair.timeUpdated = timestamp;
        pair.collision = collision;
        pair.separation = collision.depth;
        pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
        pair.friction =
            parentA.friction < parentB.friction
                ? parentA.friction
                : parentB.friction;
        pair.frictionStatic =
            parentA.frictionStatic > parentB.frictionStatic
                ? parentA.frictionStatic
                : parentB.frictionStatic;
        pair.restitution =
            parentA.restitution > parentB.restitution
                ? parentA.restitution
                : parentB.restitution;
        pair.slop = parentA.slop > parentB.slop ? parentA.slop : parentB.slop;

        pair.contactCount = supportCount;
        collision.pair = pair;

        var supportA = supports[0],
            contactA = contacts[0],
            supportB = supports[1],
            contactB = contacts[1];

        // match contacts to supports
        if (contactB.vertex === supportA || contactA.vertex === supportB) {
            contacts[1] = contactA;
            contacts[0] = contactA = contactB;
            contactB = contacts[1];
        }

        // update contacts
        contactA.vertex = supportA;
        contactB.vertex = supportB;
    };

    /**
     * Set a pair as active or inactive.
     * @method setActive
     * @param {pair} pair
     * @param {bool} isActive
     * @param {number} timestamp
     */
    Pair.setActive = function (pair, isActive, timestamp) {
        if (isActive) {
            pair.isActive = true;
            pair.timeUpdated = timestamp;
        } else {
            pair.isActive = false;
            pair.contactCount = 0;
        }
    };

    /**
     * Get the id for the given pair.
     * @method id
     * @param {body} bodyA
     * @param {body} bodyB
     * @return {string} Unique pairId
     */
    Pair.id = function (bodyA, bodyB) {
        return bodyA.id < bodyB.id
            ? bodyA.id.toString(36) + ':' + bodyB.id.toString(36)
            : bodyB.id.toString(36) + ':' + bodyA.id.toString(36);
    };
};

module.exports = init;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Vertices = __webpack_require__(2);
var Vector = __webpack_require__(1);
var Sleeping = __webpack_require__(5);
var Bounds = __webpack_require__(3);
var Axes = __webpack_require__(8);
var Common = __webpack_require__(0);

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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Common = __webpack_require__(0);

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


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * The `Matter.Contact` module contains methods for creating and manipulating collision contacts.
 *
 * @class Contact
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Contact) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Contact = {};

    var Contact = global.Matter.Contact;

    /**
     * Creates a new contact.
     * @method create
     * @param {vertex} [vertex]
     * @return {contact} A new contact
     */
    Contact.create = function (vertex) {
        return {
            vertex: vertex,
            normalImpulse: 0,
            tangentImpulse: 0,
        };
    };
};

module.exports = init;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Common = __webpack_require__(0);
var Collision = __webpack_require__(10);

/**
 * The `Matter.Detector` module contains methods for efficiently detecting collisions between a list of bodies using a broadphase algorithm.
 *
 * @class Detector
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Detector) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Detector = {};

    var Detector = global.Matter.Detector;

    Common();
    Collision();

    /**
     * Creates a new collision detector.
     * @method create
     * @param {} options
     * @return {detector} A new collision detector
     */
    Detector.create = function (options) {
        var defaults = {
            bodies: [],
            collisions: [],
            pairs: null,
        };

        return global.Matter.Common.extend(defaults, options);
    };

    /**
     * Sets the list of bodies in the detector.
     * @method setBodies
     * @param {detector} detector
     * @param {body[]} bodies
     */
    Detector.setBodies = function (detector, bodies) {
        detector.bodies = bodies.slice(0);
    };

    /**
     * Clears the detector including its list of bodies.
     * @method clear
     * @param {detector} detector
     */
    Detector.clear = function (detector) {
        detector.bodies = [];
        detector.collisions = [];
    };

    /**
     * Efficiently finds all collisions among all the bodies in `detector.bodies` using a broadphase algorithm.
     *
     * _Note:_ The specific ordering of collisions returned is not guaranteed between releases and may change for performance reasons.
     * If a specific ordering is required then apply a sort to the resulting array.
     * @method collisions
     * @param {detector} detector
     * @return {collision[]} collisions
     */
    Detector.collisions = function (detector) {
        var pairs = detector.pairs,
            bodies = detector.bodies,
            bodiesLength = bodies.length,
            canCollide = Detector.canCollide,
            collides = global.Matter.Collision.collides,
            collisions = detector.collisions,
            collisionIndex = 0,
            i,
            j;

        bodies.sort(Detector._compareBoundsX);

        for (i = 0; i < bodiesLength; i++) {
            var bodyA = bodies[i],
                boundsA = bodyA.bounds,
                boundXMax = bodyA.bounds.max.x,
                boundYMax = bodyA.bounds.max.y,
                boundYMin = bodyA.bounds.min.y,
                bodyAStatic = bodyA.isStatic || bodyA.isSleeping,
                partsALength = bodyA.parts.length,
                partsASingle = partsALength === 1;

            for (j = i + 1; j < bodiesLength; j++) {
                var bodyB = bodies[j],
                    boundsB = bodyB.bounds;

                if (boundsB.min.x > boundXMax) {
                    break;
                }

                if (boundYMax < boundsB.min.y || boundYMin > boundsB.max.y) {
                    continue;
                }

                if (bodyAStatic && (bodyB.isStatic || bodyB.isSleeping)) {
                    continue;
                }

                if (!canCollide(bodyA.collisionFilter, bodyB.collisionFilter)) {
                    continue;
                }

                var partsBLength = bodyB.parts.length;

                if (partsASingle && partsBLength === 1) {
                    var collision = collides(bodyA, bodyB, pairs);

                    if (collision) {
                        collisions[collisionIndex++] = collision;
                    }
                } else {
                    var partsAStart = partsALength > 1 ? 1 : 0,
                        partsBStart = partsBLength > 1 ? 1 : 0;

                    for (var k = partsAStart; k < partsALength; k++) {
                        var partA = bodyA.parts[k],
                            boundsA = partA.bounds;

                        for (var z = partsBStart; z < partsBLength; z++) {
                            var partB = bodyB.parts[z],
                                boundsB = partB.bounds;

                            if (
                                boundsA.min.x > boundsB.max.x ||
                                boundsA.max.x < boundsB.min.x ||
                                boundsA.max.y < boundsB.min.y ||
                                boundsA.min.y > boundsB.max.y
                            ) {
                                continue;
                            }

                            var collision = collides(partA, partB, pairs);

                            if (collision) {
                                collisions[collisionIndex++] = collision;
                            }
                        }
                    }
                }
            }
        }

        if (collisions.length !== collisionIndex) {
            collisions.length = collisionIndex;
        }

        return collisions;
    };

    /**
     * Returns `true` if both supplied collision filters will allow a collision to occur.
     * See `body.collisionFilter` for more information.
     * @method canCollide
     * @param {} filterA
     * @param {} filterB
     * @return {bool} `true` if collision can occur
     */
    Detector.canCollide = function (filterA, filterB) {
        if (filterA.group === filterB.group && filterA.group !== 0)
            return filterA.group > 0;

        return (
            (filterA.mask & filterB.category) !== 0 &&
            (filterB.mask & filterA.category) !== 0
        );
    };

    /**
     * The comparison function used in the broadphase algorithm.
     * Returns the signed delta of the bodies bounds on the x-axis.
     * @private
     * @method _sortCompare
     * @param {body} bodyA
     * @param {body} bodyB
     * @return {number} The signed delta used for sorting
     */
    Detector._compareBoundsX = function (bodyA, bodyB) {
        return bodyA.bounds.min.x - bodyB.bounds.min.x;
    };

    /*
     *
     *  Properties Documentation
     *
     */

    /**
     * The array of `Matter.Body` between which the detector finds collisions.
     *
     * _Note:_ The order of bodies in this array _is not fixed_ and will be continually managed by the detector.
     * @property bodies
     * @type body[]
     * @default []
     */

    /**
     * The array of `Matter.Collision` found in the last call to `Detector.collisions` on this detector.
     * @property collisions
     * @type collision[]
     * @default []
     */

    /**
     * Optional. A `Matter.Pairs` object from which previous collision objects may be reused. Intended for internal `Matter.Engine` usage.
     * @property pairs
     * @type {pairs|null}
     * @default null
     */
};

module.exports = init;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var Vertices = __webpack_require__(2);
var Common = __webpack_require__(0);
var Bounds = __webpack_require__(3);

/**
 * The `Matter.Resolver` module contains methods for resolving collision pairs.
 *
 * @class Resolver
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Resolver) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Resolver = {};

    var Resolver = global.Matter.Resolver;

    Vertices();
    Common();
    Bounds();

    Resolver._restingThresh = 2;
    Resolver._restingThreshTangent = Math.sqrt(6);
    Resolver._positionDampen = 0.9;
    Resolver._positionWarming = 0.8;
    Resolver._frictionNormalMultiplier = 5;
    Resolver._frictionMaxStatic = Number.MAX_VALUE;

    /**
     * Prepare pairs for position solving.
     * @method preSolvePosition
     * @param {pair[]} pairs
     */
    Resolver.preSolvePosition = function (pairs) {
        var i,
            pair,
            contactCount,
            pairsLength = pairs.length;

        // find total contacts on each body
        for (i = 0; i < pairsLength; i++) {
            pair = pairs[i];

            if (!pair.isActive) continue;

            contactCount = pair.contactCount;
            pair.collision.parentA.totalContacts += contactCount;
            pair.collision.parentB.totalContacts += contactCount;
        }
    };

    /**
     * Find a solution for pair positions.
     * @method solvePosition
     * @param {pair[]} pairs
     * @param {number} delta
     * @param {number} [damping=1]
     */
    Resolver.solvePosition = function (pairs, delta, damping) {
        var i,
            pair,
            collision,
            bodyA,
            bodyB,
            normal,
            contactShare,
            positionImpulse,
            positionDampen = Resolver._positionDampen * (damping || 1),
            slopDampen = global.Matter.Common.clamp(
                delta / global.Matter.Common._baseDelta,
                0,
                1
            ),
            pairsLength = pairs.length;

        // find impulses required to resolve penetration
        for (i = 0; i < pairsLength; i++) {
            pair = pairs[i];

            if (!pair.isActive || pair.isSensor) continue;

            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;

            // get current separation between body edges involved in collision
            pair.separation =
                collision.depth +
                normal.x * (bodyB.positionImpulse.x - bodyA.positionImpulse.x) +
                normal.y * (bodyB.positionImpulse.y - bodyA.positionImpulse.y);
        }

        for (i = 0; i < pairsLength; i++) {
            pair = pairs[i];

            if (!pair.isActive || pair.isSensor) continue;

            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;
            positionImpulse = pair.separation - pair.slop * slopDampen;

            if (bodyA.isStatic || bodyB.isStatic) positionImpulse *= 2;

            if (!(bodyA.isStatic || bodyA.isSleeping)) {
                contactShare = positionDampen / bodyA.totalContacts;
                bodyA.positionImpulse.x +=
                    normal.x * positionImpulse * contactShare;
                bodyA.positionImpulse.y +=
                    normal.y * positionImpulse * contactShare;
            }

            if (!(bodyB.isStatic || bodyB.isSleeping)) {
                contactShare = positionDampen / bodyB.totalContacts;
                bodyB.positionImpulse.x -=
                    normal.x * positionImpulse * contactShare;
                bodyB.positionImpulse.y -=
                    normal.y * positionImpulse * contactShare;
            }
        }
    };

    /**
     * Apply position resolution.
     * @method postSolvePosition
     * @param {body[]} bodies
     */
    Resolver.postSolvePosition = function (bodies) {
        var positionWarming = Resolver._positionWarming,
            bodiesLength = bodies.length,
            verticesTranslate = global.Matter.Vertices.translate,
            boundsUpdate = global.Matter.Bounds.update;

        for (var i = 0; i < bodiesLength; i++) {
            var body = bodies[i],
                positionImpulse = body.positionImpulse,
                positionImpulseX = positionImpulse.x,
                positionImpulseY = positionImpulse.y,
                velocity = body.velocity;

            // reset contact count
            body.totalContacts = 0;

            if (positionImpulseX !== 0 || positionImpulseY !== 0) {
                // update body geometry
                for (var j = 0; j < body.parts.length; j++) {
                    var part = body.parts[j];
                    verticesTranslate(part.vertices, positionImpulse);
                    boundsUpdate(part.bounds, part.vertices, velocity);
                    part.position.x += positionImpulseX;
                    part.position.y += positionImpulseY;
                }

                // move the body without changing velocity
                body.positionPrev.x += positionImpulseX;
                body.positionPrev.y += positionImpulseY;

                if (
                    positionImpulseX * velocity.x +
                        positionImpulseY * velocity.y <
                    0
                ) {
                    // reset cached impulse if the body has velocity along it
                    positionImpulse.x = 0;
                    positionImpulse.y = 0;
                } else {
                    // warm the next iteration
                    positionImpulse.x *= positionWarming;
                    positionImpulse.y *= positionWarming;
                }
            }
        }
    };

    /**
     * Prepare pairs for velocity solving.
     * @method preSolveVelocity
     * @param {pair[]} pairs
     */
    Resolver.preSolveVelocity = function (pairs) {
        var pairsLength = pairs.length,
            i,
            j;

        for (i = 0; i < pairsLength; i++) {
            var pair = pairs[i];

            if (!pair.isActive || pair.isSensor) continue;

            var contacts = pair.contacts,
                contactCount = pair.contactCount,
                collision = pair.collision,
                bodyA = collision.parentA,
                bodyB = collision.parentB,
                normal = collision.normal,
                tangent = collision.tangent;

            // resolve each contact
            for (j = 0; j < contactCount; j++) {
                var contact = contacts[j],
                    contactVertex = contact.vertex,
                    normalImpulse = contact.normalImpulse,
                    tangentImpulse = contact.tangentImpulse;

                if (normalImpulse !== 0 || tangentImpulse !== 0) {
                    // total impulse from contact
                    var impulseX =
                            normal.x * normalImpulse +
                            tangent.x * tangentImpulse,
                        impulseY =
                            normal.y * normalImpulse +
                            tangent.y * tangentImpulse;

                    // apply impulse from contact
                    if (!(bodyA.isStatic || bodyA.isSleeping)) {
                        bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                        bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                        bodyA.anglePrev +=
                            bodyA.inverseInertia *
                            ((contactVertex.x - bodyA.position.x) * impulseY -
                                (contactVertex.y - bodyA.position.y) *
                                    impulseX);
                    }

                    if (!(bodyB.isStatic || bodyB.isSleeping)) {
                        bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                        bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                        bodyB.anglePrev -=
                            bodyB.inverseInertia *
                            ((contactVertex.x - bodyB.position.x) * impulseY -
                                (contactVertex.y - bodyB.position.y) *
                                    impulseX);
                    }
                }
            }
        }
    };

    /**
     * Find a solution for pair velocities.
     * @method solveVelocity
     * @param {pair[]} pairs
     * @param {number} delta
     */
    Resolver.solveVelocity = function (pairs, delta) {
        var timeScale = delta / global.Matter.Common._baseDelta,
            timeScaleSquared = timeScale * timeScale,
            timeScaleCubed = timeScaleSquared * timeScale,
            restingThresh = -Resolver._restingThresh * timeScale,
            restingThreshTangent = Resolver._restingThreshTangent,
            frictionNormalMultiplier =
                Resolver._frictionNormalMultiplier * timeScale,
            frictionMaxStatic = Resolver._frictionMaxStatic,
            pairsLength = pairs.length,
            tangentImpulse,
            maxFriction,
            i,
            j;

        for (i = 0; i < pairsLength; i++) {
            var pair = pairs[i];

            if (!pair.isActive || pair.isSensor) continue;

            var collision = pair.collision,
                bodyA = collision.parentA,
                bodyB = collision.parentB,
                normalX = collision.normal.x,
                normalY = collision.normal.y,
                tangentX = collision.tangent.x,
                tangentY = collision.tangent.y,
                inverseMassTotal = pair.inverseMass,
                friction =
                    pair.friction *
                    pair.frictionStatic *
                    frictionNormalMultiplier,
                contacts = pair.contacts,
                contactCount = pair.contactCount,
                contactShare = 1 / contactCount;

            // get body velocities
            var bodyAVelocityX = bodyA.position.x - bodyA.positionPrev.x,
                bodyAVelocityY = bodyA.position.y - bodyA.positionPrev.y,
                bodyAAngularVelocity = bodyA.angle - bodyA.anglePrev,
                bodyBVelocityX = bodyB.position.x - bodyB.positionPrev.x,
                bodyBVelocityY = bodyB.position.y - bodyB.positionPrev.y,
                bodyBAngularVelocity = bodyB.angle - bodyB.anglePrev;

            // resolve each contact
            for (j = 0; j < contactCount; j++) {
                var contact = contacts[j],
                    contactVertex = contact.vertex;

                var offsetAX = contactVertex.x - bodyA.position.x,
                    offsetAY = contactVertex.y - bodyA.position.y,
                    offsetBX = contactVertex.x - bodyB.position.x,
                    offsetBY = contactVertex.y - bodyB.position.y;

                var velocityPointAX =
                        bodyAVelocityX - offsetAY * bodyAAngularVelocity,
                    velocityPointAY =
                        bodyAVelocityY + offsetAX * bodyAAngularVelocity,
                    velocityPointBX =
                        bodyBVelocityX - offsetBY * bodyBAngularVelocity,
                    velocityPointBY =
                        bodyBVelocityY + offsetBX * bodyBAngularVelocity;

                var relativeVelocityX = velocityPointAX - velocityPointBX,
                    relativeVelocityY = velocityPointAY - velocityPointBY;

                var normalVelocity =
                        normalX * relativeVelocityX +
                        normalY * relativeVelocityY,
                    tangentVelocity =
                        tangentX * relativeVelocityX +
                        tangentY * relativeVelocityY;

                // coulomb friction
                var normalOverlap = pair.separation + normalVelocity;
                var normalForce = Math.min(normalOverlap, 1);
                normalForce = normalOverlap < 0 ? 0 : normalForce;

                var frictionLimit = normalForce * friction;

                if (
                    tangentVelocity < -frictionLimit ||
                    tangentVelocity > frictionLimit
                ) {
                    maxFriction =
                        tangentVelocity > 0
                            ? tangentVelocity
                            : -tangentVelocity;
                    tangentImpulse =
                        pair.friction *
                        (tangentVelocity > 0 ? 1 : -1) *
                        timeScaleCubed;

                    if (tangentImpulse < -maxFriction) {
                        tangentImpulse = -maxFriction;
                    } else if (tangentImpulse > maxFriction) {
                        tangentImpulse = maxFriction;
                    }
                } else {
                    tangentImpulse = tangentVelocity;
                    maxFriction = frictionMaxStatic;
                }

                // account for mass, inertia and contact offset
                var oAcN = offsetAX * normalY - offsetAY * normalX,
                    oBcN = offsetBX * normalY - offsetBY * normalX,
                    share =
                        contactShare /
                        (inverseMassTotal +
                            bodyA.inverseInertia * oAcN * oAcN +
                            bodyB.inverseInertia * oBcN * oBcN);

                // raw impulses
                var normalImpulse =
                    (1 + pair.restitution) * normalVelocity * share;
                tangentImpulse *= share;

                // handle high velocity and resting collisions separately
                if (normalVelocity < restingThresh) {
                    // high normal velocity so clear cached contact normal impulse
                    contact.normalImpulse = 0;
                } else {
                    // solve resting collision constraints using Erin Catto's method (GDC08)
                    // impulse constraint tends to 0
                    var contactNormalImpulse = contact.normalImpulse;
                    contact.normalImpulse += normalImpulse;
                    if (contact.normalImpulse > 0) contact.normalImpulse = 0;
                    normalImpulse =
                        contact.normalImpulse - contactNormalImpulse;
                }

                // handle high velocity and resting collisions separately
                if (
                    tangentVelocity < -restingThreshTangent ||
                    tangentVelocity > restingThreshTangent
                ) {
                    // high tangent velocity so clear cached contact tangent impulse
                    contact.tangentImpulse = 0;
                } else {
                    // solve resting collision constraints using Erin Catto's method (GDC08)
                    // tangent impulse tends to -tangentSpeed or +tangentSpeed
                    var contactTangentImpulse = contact.tangentImpulse;
                    contact.tangentImpulse += tangentImpulse;
                    if (contact.tangentImpulse < -maxFriction)
                        contact.tangentImpulse = -maxFriction;
                    if (contact.tangentImpulse > maxFriction)
                        contact.tangentImpulse = maxFriction;
                    tangentImpulse =
                        contact.tangentImpulse - contactTangentImpulse;
                }

                // total impulse from contact
                var impulseX =
                        normalX * normalImpulse + tangentX * tangentImpulse,
                    impulseY =
                        normalY * normalImpulse + tangentY * tangentImpulse;

                // apply impulse from contact
                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                    bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                    bodyA.anglePrev +=
                        (offsetAX * impulseY - offsetAY * impulseX) *
                        bodyA.inverseInertia;
                }

                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                    bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                    bodyB.anglePrev -=
                        (offsetBX * impulseY - offsetBY * impulseX) *
                        bodyB.inverseInertia;
                }
            }
        }
    };
};

module.exports = init;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Pair = __webpack_require__(11);
var Common = __webpack_require__(0);

/**
 * The `Matter.Pairs` module contains methods for creating and manipulating collision pair sets.
 *
 * @class Pairs
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Pairs) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Pairs = {};

    var Pairs = global.Matter.Pairs;

    Pair();
    Common();

    /**
     * Creates a new pairs structure.
     * @method create
     * @param {object} options
     * @return {pairs} A new pairs structure
     */
    Pairs.create = function (options) {
        return global.Matter.Common.extend(
            {
                table: {},
                list: [],
                collisionStart: [],
                collisionActive: [],
                collisionEnd: [],
            },
            options
        );
    };

    /**
     * Updates pairs given a list of collisions.
     * @method update
     * @param {object} pairs
     * @param {collision[]} collisions
     * @param {number} timestamp
     */
    Pairs.update = function (pairs, collisions, timestamp) {
        var pairUpdate = global.Matter.Pair.update,
            pairCreate = global.Matter.Pair.create,
            pairSetActive = global.Matter.Pair.setActive,
            pairsTable = pairs.table,
            pairsList = pairs.list,
            pairsListLength = pairsList.length,
            pairsListIndex = pairsListLength,
            collisionStart = pairs.collisionStart,
            collisionEnd = pairs.collisionEnd,
            collisionActive = pairs.collisionActive,
            collisionsLength = collisions.length,
            collisionStartIndex = 0,
            collisionEndIndex = 0,
            collisionActiveIndex = 0,
            collision,
            pair,
            i;

        for (i = 0; i < collisionsLength; i++) {
            collision = collisions[i];
            pair = collision.pair;

            if (pair) {
                // pair already exists (but may or may not be active)
                if (pair.isActive) {
                    // pair exists and is active
                    collisionActive[collisionActiveIndex++] = pair;
                }

                // update the pair
                pairUpdate(pair, collision, timestamp);
            } else {
                // pair did not exist, create a new pair
                pair = pairCreate(collision, timestamp);
                pairsTable[pair.id] = pair;

                // add the new pair
                collisionStart[collisionStartIndex++] = pair;
                pairsList[pairsListIndex++] = pair;
            }
        }

        // find pairs that are no longer active
        pairsListIndex = 0;
        pairsListLength = pairsList.length;

        for (i = 0; i < pairsListLength; i++) {
            pair = pairsList[i];

            // pair is active if updated this timestep
            if (pair.timeUpdated >= timestamp) {
                // keep active pairs
                pairsList[pairsListIndex++] = pair;
            } else {
                pairSetActive(pair, false, timestamp);

                // keep inactive pairs if both bodies may be sleeping
                if (
                    pair.collision.bodyA.sleepCounter > 0 &&
                    pair.collision.bodyB.sleepCounter > 0
                ) {
                    pairsList[pairsListIndex++] = pair;
                } else {
                    // remove inactive pairs if either body awake
                    collisionEnd[collisionEndIndex++] = pair;
                    delete pairsTable[pair.id];
                }
            }
        }

        // update array lengths if changed
        if (pairsList.length !== pairsListIndex) {
            pairsList.length = pairsListIndex;
        }

        if (collisionStart.length !== collisionStartIndex) {
            collisionStart.length = collisionStartIndex;
        }

        if (collisionEnd.length !== collisionEndIndex) {
            collisionEnd.length = collisionEndIndex;
        }

        if (collisionActive.length !== collisionActiveIndex) {
            collisionActive.length = collisionActiveIndex;
        }
    };

    /**
     * Clears the given pairs structure.
     * @method clear
     * @param {pairs} pairs
     * @return {pairs} pairs
     */
    Pairs.clear = function (pairs) {
        pairs.table = {};
        pairs.list.length = 0;
        pairs.collisionStart.length = 0;
        pairs.collisionActive.length = 0;
        pairs.collisionEnd.length = 0;
        return pairs;
    };
};

module.exports = init;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Matter = __webpack_require__(19);

var Axes = __webpack_require__(8);
var Bodies = __webpack_require__(9);
var Body = __webpack_require__(4);
var Bounds = __webpack_require__(3);
var Collision = __webpack_require__(10);
var Common = __webpack_require__(0);
var Composite = __webpack_require__(7);
var Composites = __webpack_require__(20);
var Constraint = __webpack_require__(12);
var Contact = __webpack_require__(14);
var Detector = __webpack_require__(15);
var Engine = __webpack_require__(21);
var Events = __webpack_require__(6);
var Pair = __webpack_require__(11);
var Pairs = __webpack_require__(17);
var Plugin = __webpack_require__(13);
var Query = __webpack_require__(22);
var Resolver = __webpack_require__(16);
var Sleeping = __webpack_require__(5);
var Vector = __webpack_require__(1);
var Vertices = __webpack_require__(2);
var World = __webpack_require__(23);

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


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var Plugin = __webpack_require__(13);
var Common = __webpack_require__(0);

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
         true ? "0.1.0" : undefined;

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


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var Composite = __webpack_require__(7);
var Constraint = __webpack_require__(12);
var Common = __webpack_require__(0);
var Body = __webpack_require__(4);
var Bodies = __webpack_require__(9);

/**
 * The `Matter.Composites` module contains factory methods for creating composite bodies
 * with commonly used configurations (such as stacks and chains).
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Composites
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Composites) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Composites = {};

    var Composites = global.Matter.Composites;

    Composite();
    Constraint();
    Common();
    Body();
    Bodies();

    var deprecated = global.Matter.Common.deprecated;

    /**
     * Create a new composite containing bodies created in the callback in a grid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method stack
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.stack = function (
        x,
        y,
        columns,
        rows,
        columnGap,
        rowGap,
        callback
    ) {
        var stack = global.Matter.Composite.create({ label: 'Stack' }),
            currentX = x,
            currentY = y,
            lastBody,
            i = 0;

        for (var row = 0; row < rows; row++) {
            var maxHeight = 0;

            for (var column = 0; column < columns; column++) {
                var body = callback(
                    currentX,
                    currentY,
                    column,
                    row,
                    lastBody,
                    i
                );

                if (body) {
                    var bodyHeight = body.bounds.max.y - body.bounds.min.y,
                        bodyWidth = body.bounds.max.x - body.bounds.min.x;

                    if (bodyHeight > maxHeight) maxHeight = bodyHeight;

                    global.Matter.Body.translate(body, {
                        x: bodyWidth * 0.5,
                        y: bodyHeight * 0.5,
                    });

                    currentX = body.bounds.max.x + columnGap;

                    global.Matter.Composite.addBody(stack, body);

                    lastBody = body;
                    i += 1;
                } else {
                    currentX += columnGap;
                }
            }

            currentY += maxHeight + rowGap;
            currentX = x;
        }

        return stack;
    };

    /**
     * Chains all bodies in the given composite together using constraints.
     * @method chain
     * @param {composite} composite
     * @param {number} xOffsetA
     * @param {number} yOffsetA
     * @param {number} xOffsetB
     * @param {number} yOffsetB
     * @param {object} options
     * @return {composite} A new composite containing objects chained together with constraints
     */
    Composites.chain = function (
        composite,
        xOffsetA,
        yOffsetA,
        xOffsetB,
        yOffsetB,
        options
    ) {
        var bodies = composite.bodies;

        for (var i = 1; i < bodies.length; i++) {
            var bodyA = bodies[i - 1],
                bodyB = bodies[i],
                bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y,
                bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x,
                bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y,
                bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;

            var defaults = {
                bodyA: bodyA,
                pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                bodyB: bodyB,
                pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB },
            };

            var constraint = global.Matter.Common.extend(defaults, options);

            global.Matter.Composite.addConstraint(
                composite,
                global.Matter.Constraint.create(constraint)
            );
        }

        composite.label += ' Chain';

        return composite;
    };

    /**
     * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
     * @method mesh
     * @param {composite} composite
     * @param {number} columns
     * @param {number} rows
     * @param {boolean} crossBrace
     * @param {object} options
     * @return {composite} The composite containing objects meshed together with constraints
     */
    Composites.mesh = function (composite, columns, rows, crossBrace, options) {
        var bodies = composite.bodies,
            row,
            col,
            bodyA,
            bodyB,
            bodyC;

        for (row = 0; row < rows; row++) {
            for (col = 1; col < columns; col++) {
                bodyA = bodies[col - 1 + row * columns];
                bodyB = bodies[col + row * columns];
                global.Matter.Composite.addConstraint(
                    composite,
                    global.Matter.Constraint.create(
                        global.Matter.Common.extend(
                            { bodyA: bodyA, bodyB: bodyB },
                            options
                        )
                    )
                );
            }

            if (row > 0) {
                for (col = 0; col < columns; col++) {
                    bodyA = bodies[col + (row - 1) * columns];
                    bodyB = bodies[col + row * columns];
                    global.Matter.Composite.addConstraint(
                        composite,
                        global.Matter.Constraint.create(
                            global.Matter.Common.extend(
                                { bodyA: bodyA, bodyB: bodyB },
                                options
                            )
                        )
                    );

                    if (crossBrace && col > 0) {
                        bodyC = bodies[col - 1 + (row - 1) * columns];
                        global.Matter.Composite.addConstraint(
                            composite,
                            global.Matter.Constraint.create(
                                global.Matter.Common.extend(
                                    { bodyA: bodyC, bodyB: bodyB },
                                    options
                                )
                            )
                        );
                    }

                    if (crossBrace && col < columns - 1) {
                        bodyC = bodies[col + 1 + (row - 1) * columns];
                        global.Matter.Composite.addConstraint(
                            composite,
                            global.Matter.Constraint.create(
                                global.Matter.Common.extend(
                                    { bodyA: bodyC, bodyB: bodyB },
                                    options
                                )
                            )
                        );
                    }
                }
            }
        }

        composite.label += ' Mesh';

        return composite;
    };

    /**
     * Create a new composite containing bodies created in the callback in a pyramid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method pyramid
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.pyramid = function (
        x,
        y,
        columns,
        rows,
        columnGap,
        rowGap,
        callback
    ) {
        return Composites.stack(
            x,
            y,
            columns,
            rows,
            columnGap,
            rowGap,
            function (stackX, stackY, column, row, lastBody, i) {
                var actualRows = Math.min(rows, Math.ceil(columns / 2)),
                    lastBodyWidth = lastBody
                        ? lastBody.bounds.max.x - lastBody.bounds.min.x
                        : 0;

                if (row > actualRows) return;

                // reverse row order
                row = actualRows - row;

                var start = row,
                    end = columns - 1 - row;

                if (column < start || column > end) return;

                // retroactively fix the first body's position, since width was unknown
                if (i === 1) {
                    global.Matter.Body.translate(lastBody, {
                        x:
                            (column + (columns % 2 === 1 ? 1 : -1)) *
                            lastBodyWidth,
                        y: 0,
                    });
                }

                var xOffset = lastBody ? column * lastBodyWidth : 0;

                return callback(
                    x + xOffset + column * columnGap,
                    stackY,
                    column,
                    row,
                    lastBody,
                    i
                );
            }
        );
    };

    /**
     * This has now moved to the [newtonsCradle example](https://github.com/liabru/matter-js/blob/master/examples/newtonsCradle.js), follow that instead as this function is deprecated here.
     * @deprecated moved to newtonsCradle example
     * @method newtonsCradle
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} number
     * @param {number} size
     * @param {number} length
     * @return {composite} A new composite newtonsCradle body
     */
    Composites.newtonsCradle = function (x, y, number, size, length) {
        var newtonsCradle = global.Matter.Composite.create({
            label: 'Newtons Cradle',
        });

        for (var i = 0; i < number; i++) {
            var separation = 1.9,
                circle = global.Matter.Bodies.circle(
                    x + i * (size * separation),
                    y + length,
                    size,
                    {
                        inertia: Infinity,
                        restitution: 1,
                        friction: 0,
                        frictionAir: 0.0001,
                        slop: 1,
                    }
                ),
                constraint = global.Matter.Constraint.create({
                    pointA: { x: x + i * (size * separation), y: y },
                    bodyB: circle,
                });

            global.Matter.Composite.addBody(newtonsCradle, circle);
            global.Matter.Composite.addConstraint(newtonsCradle, constraint);
        }

        return newtonsCradle;
    };

    deprecated(
        Composites,
        'newtonsCradle',
        'Composites.newtonsCradle ➤ moved to newtonsCradle example'
    );

    /**
     * This has now moved to the [car example](https://github.com/liabru/matter-js/blob/master/examples/car.js), follow that instead as this function is deprecated here.
     * @deprecated moved to car example
     * @method car
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} width
     * @param {number} height
     * @param {number} wheelSize
     * @return {composite} A new composite car body
     */
    Composites.car = function (x, y, width, height, wheelSize) {
        var group = global.Matter.Body.nextGroup(true),
            wheelBase = 20,
            wheelAOffset = -width * 0.5 + wheelBase,
            wheelBOffset = width * 0.5 - wheelBase,
            wheelYOffset = 0;

        var car = global.Matter.Composite.create({ label: 'Car' }),
            body = global.Matter.Bodies.rectangle(x, y, width, height, {
                collisionFilter: {
                    group: group,
                },
                chamfer: {
                    radius: height * 0.5,
                },
                density: 0.0002,
            });

        var wheelA = global.Matter.Bodies.circle(
            x + wheelAOffset,
            y + wheelYOffset,
            wheelSize,
            {
                collisionFilter: {
                    group: group,
                },
                friction: 0.8,
            }
        );

        var wheelB = global.Matter.Bodies.circle(
            x + wheelBOffset,
            y + wheelYOffset,
            wheelSize,
            {
                collisionFilter: {
                    group: group,
                },
                friction: 0.8,
            }
        );

        var axelA = global.Matter.Constraint.create({
            bodyB: body,
            pointB: { x: wheelAOffset, y: wheelYOffset },
            bodyA: wheelA,
            stiffness: 1,
            length: 0,
        });

        var axelB = global.Matter.Constraint.create({
            bodyB: body,
            pointB: { x: wheelBOffset, y: wheelYOffset },
            bodyA: wheelB,
            stiffness: 1,
            length: 0,
        });

        global.Matter.Composite.addBody(car, body);
        global.Matter.Composite.addBody(car, wheelA);
        global.Matter.Composite.addBody(car, wheelB);
        global.Matter.Composite.addConstraint(car, axelA);
        global.Matter.Composite.addConstraint(car, axelB);

        return car;
    };

    deprecated(Composites, 'car', 'Composites.car ➤ moved to car example');

    /**
     * This has now moved to the [softBody example](https://github.com/liabru/matter-js/blob/master/examples/softBody.js)
     * and the [cloth example](https://github.com/liabru/matter-js/blob/master/examples/cloth.js), follow those instead as this function is deprecated here.
     * @deprecated moved to softBody and cloth examples
     * @method softBody
     * @param {number} x Starting position in X.
     * @param {number} y Starting position in Y.
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {boolean} crossBrace
     * @param {number} particleRadius
     * @param {} particleOptions
     * @param {} constraintOptions
     * @return {composite} A new composite softBody
     */
    Composites.softBody = function (
        x,
        y,
        columns,
        rows,
        columnGap,
        rowGap,
        crossBrace,
        particleRadius,
        particleOptions,
        constraintOptions
    ) {
        particleOptions = global.Matter.Common.extend(
            { inertia: Infinity },
            particleOptions
        );
        constraintOptions = global.Matter.Common.extend(
            { stiffness: 0.2, render: { type: 'line', anchors: false } },
            constraintOptions
        );

        var softBody = Composites.stack(
            x,
            y,
            columns,
            rows,
            columnGap,
            rowGap,
            function (stackX, stackY) {
                return global.Matter.Bodies.circle(
                    stackX,
                    stackY,
                    particleRadius,
                    particleOptions
                );
            }
        );

        Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);

        softBody.label = 'Soft Body';

        return softBody;
    };

    deprecated(
        Composites,
        'softBody',
        'Composites.softBody ➤ moved to softBody and cloth examples'
    );
};

module.exports = init;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var Sleeping = __webpack_require__(5);
var Resolver = __webpack_require__(16);
var Detector = __webpack_require__(15);
var Pairs = __webpack_require__(17);
var Events = __webpack_require__(6);
var Composite = __webpack_require__(7);
var Constraint = __webpack_require__(12);
var Common = __webpack_require__(0);
var Body = __webpack_require__(4);

/**
 * The `Matter.Engine` module contains methods for creating and manipulating engines.
 * An engine is a controller that manages updating the simulation of the world.
 * See `Matter.Runner` for an optional game loop utility.
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Engine
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Engine) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Engine = {};

    var Engine = global.Matter.Engine;

    Sleeping();
    Resolver();
    Detector();
    Pairs();
    Events();
    Composite();
    Constraint();
    Common();
    Body();

    Engine._deltaMax = 1000 / 60;

    /**
     * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {object} [options]
     * @return {engine} engine
     */
    Engine.create = function (options) {
        options = options || {};

        var defaults = {
            positionIterations: 6,
            velocityIterations: 4,
            constraintIterations: 2,
            enableSleeping: false,
            events: [],
            plugin: {},
            gravity: {
                x: 0,
                y: 1,
                scale: 0.001,
            },
            timing: {
                timestamp: 0,
                timeScale: 1,
                lastDelta: 0,
                lastElapsed: 0,
                lastUpdatesPerFrame: 0,
            },
        };

        var engine = global.Matter.Common.extend(defaults, options);

        engine.world =
            options.world || global.Matter.Composite.create({ label: 'World' });
        engine.pairs = options.pairs || global.Matter.Pairs.create();
        engine.detector = options.detector || global.Matter.Detector.create();
        engine.detector.pairs = engine.pairs;

        // for temporary back compatibility only
        engine.grid = { buckets: [] };
        engine.world.gravity = engine.gravity;
        engine.broadphase = engine.grid;
        engine.metrics = {};

        return engine;
    };

    /**
     * Moves the simulation forward in time by `delta` milliseconds.
     * Triggers `beforeUpdate`, `beforeSolve` and `afterUpdate` events.
     * Triggers `collisionStart`, `collisionActive` and `collisionEnd` events.
     * @method update
     * @param {engine} engine
     * @param {number} [delta=16.666]
     */
    Engine.update = function (engine, delta) {
        var startTime = global.Matter.Common.now();

        var world = engine.world,
            detector = engine.detector,
            pairs = engine.pairs,
            timing = engine.timing,
            timestamp = timing.timestamp,
            i;

        // warn if high delta
        if (delta > global.Matter.Engine._deltaMax) {
            global.Matter.Common.warnOnce(
                'Matter.Engine.update: delta argument is recommended to be less than or equal to',
                global.Matter.Engine._deltaMax.toFixed(3),
                'ms.'
            );
        }

        delta =
            typeof delta !== 'undefined'
                ? delta
                : global.Matter.Common._baseDelta;
        delta *= timing.timeScale;

        // increment timestamp
        timing.timestamp += delta;
        timing.lastDelta = delta;

        // create an event object
        var event = {
            timestamp: timing.timestamp,
            delta: delta,
        };

        global.Matter.Events.trigger(engine, 'beforeUpdate', event);

        // get all bodies and all constraints in the world
        var allBodies = global.Matter.Composite.allBodies(world),
            allConstraints = global.Matter.Composite.allConstraints(world);

        // if the world has changed
        if (world.isModified) {
            // update the detector bodies
            global.Matter.Detector.setBodies(detector, allBodies);

            // reset all composite modified flags
            global.Matter.Composite.setModified(world, false, false, true);
        }

        // update sleeping if enabled
        if (engine.enableSleeping)
            global.Matter.Sleeping.update(allBodies, delta);

        // apply gravity to all bodies
        global.Matter.Engine._bodiesApplyGravity(allBodies, engine.gravity);

        // update all body position and rotation by integration
        if (delta > 0) {
            global.Matter.Engine._bodiesUpdate(allBodies, delta);
        }

        global.Matter.Events.trigger(engine, 'beforeSolve', event);

        // update all constraints (first pass)
        global.Matter.Constraint.preSolveAll(allBodies);
        for (i = 0; i < engine.constraintIterations; i++) {
            global.Matter.Constraint.solveAll(allConstraints, delta);
        }
        global.Matter.Constraint.postSolveAll(allBodies);

        // find all collisions
        var collisions = global.Matter.Detector.collisions(detector);

        // update collision pairs
        global.Matter.Pairs.update(pairs, collisions, timestamp);

        // wake up bodies involved in collisions
        if (engine.enableSleeping)
            global.Matter.Sleeping.afterCollisions(pairs.list);

        // trigger collision events
        if (pairs.collisionStart.length > 0) {
            global.Matter.Events.trigger(engine, 'collisionStart', {
                pairs: pairs.collisionStart,
                timestamp: timing.timestamp,
                delta: delta,
            });
        }

        // iteratively resolve position between collisions
        var positionDamping = global.Matter.Common.clamp(
            20 / engine.positionIterations,
            0,
            1
        );

        global.Matter.Resolver.preSolvePosition(pairs.list);
        for (i = 0; i < engine.positionIterations; i++) {
            global.Matter.Resolver.solvePosition(
                pairs.list,
                delta,
                positionDamping
            );
        }
        global.Matter.Resolver.postSolvePosition(allBodies);

        // update all constraints (second pass)
        global.Matter.Constraint.preSolveAll(allBodies);
        for (i = 0; i < engine.constraintIterations; i++) {
            global.Matter.Constraint.solveAll(allConstraints, delta);
        }
        global.Matter.Constraint.postSolveAll(allBodies);

        // iteratively resolve velocity between collisions
        global.Matter.Resolver.preSolveVelocity(pairs.list);
        for (i = 0; i < engine.velocityIterations; i++) {
            global.Matter.Resolver.solveVelocity(pairs.list, delta);
        }

        // update body speed and velocity properties
        global.Matter.Engine._bodiesUpdateVelocities(allBodies);

        // trigger collision events
        if (pairs.collisionActive.length > 0) {
            global.Matter.Events.trigger(engine, 'collisionActive', {
                pairs: pairs.collisionActive,
                timestamp: timing.timestamp,
                delta: delta,
            });
        }

        if (pairs.collisionEnd.length > 0) {
            global.Matter.Events.trigger(engine, 'collisionEnd', {
                pairs: pairs.collisionEnd,
                timestamp: timing.timestamp,
                delta: delta,
            });
        }

        // clear force buffers
        global.Matter.Engine._bodiesClearForces(allBodies);

        global.Matter.Events.trigger(engine, 'afterUpdate', event);

        // log the time elapsed computing this update
        engine.timing.lastElapsed = global.Matter.Common.now() - startTime;

        return engine;
    };

    /**
     * Merges two engines by keeping the configuration of `engineA` but replacing the world with the one from `engineB`.
     * @method merge
     * @param {engine} engineA
     * @param {engine} engineB
     */
    Engine.merge = function (engineA, engineB) {
        global.Matter.Common.extend(engineA, engineB);

        if (engineB.world) {
            engineA.world = engineB.world;

            Engine.clear(engineA);

            var bodies = global.Matter.Composite.allBodies(engineA.world);

            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                global.Matter.Sleeping.set(body, false);
                body.id = global.Matter.Common.nextId();
            }
        }
    };

    /**
     * Clears the engine pairs and detector.
     * @method clear
     * @param {engine} engine
     */
    Engine.clear = function (engine) {
        global.Matter.Pairs.clear(engine.pairs);
        Detector.clear(engine.detector);
    };

    /**
     * Zeroes the `body.force` and `body.torque` force buffers.
     * @method _bodiesClearForces
     * @private
     * @param {body[]} bodies
     */
    Engine._bodiesClearForces = function (bodies) {
        var bodiesLength = bodies.length;

        for (var i = 0; i < bodiesLength; i++) {
            var body = bodies[i];

            // reset force buffers
            body.force.x = 0;
            body.force.y = 0;
            body.torque = 0;
        }
    };

    /**
     * Applies gravitational acceleration to all `bodies`.
     * This models a [uniform gravitational field](https://en.wikipedia.org/wiki/Gravity_of_Earth), similar to near the surface of a planet.
     *
     * @method _bodiesApplyGravity
     * @private
     * @param {body[]} bodies
     * @param {vector} gravity
     */
    Engine._bodiesApplyGravity = function (bodies, gravity) {
        var gravityScale =
                typeof gravity.scale !== 'undefined' ? gravity.scale : 0.001,
            bodiesLength = bodies.length;

        if ((gravity.x === 0 && gravity.y === 0) || gravityScale === 0) {
            return;
        }

        for (var i = 0; i < bodiesLength; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping) continue;

            // add the resultant force of gravity
            body.force.y += body.mass * gravity.y * gravityScale;
            body.force.x += body.mass * gravity.x * gravityScale;
        }
    };

    /**
     * Applies `Body.update` to all given `bodies`.
     * @method _bodiesUpdate
     * @private
     * @param {body[]} bodies
     * @param {number} delta The amount of time elapsed between updates
     */
    Engine._bodiesUpdate = function (bodies, delta) {
        var bodiesLength = bodies.length;

        for (var i = 0; i < bodiesLength; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping) continue;

            global.Matter.Body.update(body, delta);
        }
    };

    /**
     * Applies `Body.updateVelocities` to all given `bodies`.
     * @method _bodiesUpdateVelocities
     * @private
     * @param {body[]} bodies
     */
    Engine._bodiesUpdateVelocities = function (bodies) {
        var bodiesLength = bodies.length;

        for (var i = 0; i < bodiesLength; i++) {
            global.Matter.Body.updateVelocities(bodies[i]);
        }
    };

    /**
     * A deprecated alias for `Runner.run`, use `Matter.Runner.run(engine)` instead and see `Matter.Runner` for more information.
     * @deprecated use Matter.Runner.run(engine) instead
     * @method run
     * @param {engine} engine
     */

    /**
     * Fired just before an update
     *
     * @event beforeUpdate
     * @param {object} event An event object
     * @param {number} event.timestamp The engine.timing.timestamp of the event
     * @param {number} event.delta The delta time in milliseconds value used in the update
     * @param {engine} event.source The source object of the event
     * @param {string} event.name The name of the event
     */

    /**
     * Fired after bodies updated based on their velocity and forces, but before any collision detection, constraints and resolving etc.
     *
     * @event beforeSolve
     * @param {object} event An event object
     * @param {number} event.timestamp The engine.timing.timestamp of the event
     * @param {number} event.delta The delta time in milliseconds value used in the update
     * @param {engine} event.source The source object of the event
     * @param {string} event.name The name of the event
     */

    /**
     * Fired after engine update and all collision events
     *
     * @event afterUpdate
     * @param {object} event An event object
     * @param {number} event.timestamp The engine.timing.timestamp of the event
     * @param {number} event.delta The delta time in milliseconds value used in the update
     * @param {engine} event.source The source object of the event
     * @param {string} event.name The name of the event
     */

    /**
     * Fired after engine update, provides a list of all pairs that have started to collide in the current tick (if any)
     *
     * @event collisionStart
     * @param {object} event An event object
     * @param {pair[]} event.pairs List of affected pairs
     * @param {number} event.timestamp The engine.timing.timestamp of the event
     * @param {number} event.delta The delta time in milliseconds value used in the update
     * @param {engine} event.source The source object of the event
     * @param {string} event.name The name of the event
     */

    /**
     * Fired after engine update, provides a list of all pairs that are colliding in the current tick (if any)
     *
     * @event collisionActive
     * @param {object} event An event object
     * @param {pair[]} event.pairs List of affected pairs
     * @param {number} event.timestamp The engine.timing.timestamp of the event
     * @param {number} event.delta The delta time in milliseconds value used in the update
     * @param {engine} event.source The source object of the event
     * @param {string} event.name The name of the event
     */

    /**
     * Fired after engine update, provides a list of all pairs that have ended collision in the current tick (if any)
     *
     * @event collisionEnd
     * @param {object} event An event object
     * @param {pair[]} event.pairs List of affected pairs
     * @param {number} event.timestamp The engine.timing.timestamp of the event
     * @param {number} event.delta The delta time in milliseconds value used in the update
     * @param {engine} event.source The source object of the event
     * @param {string} event.name The name of the event
     */

    /*
     *
     *  Properties Documentation
     *
     */

    /**
     * An integer `Number` that specifies the number of position iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property positionIterations
     * @type number
     * @default 6
     */

    /**
     * An integer `Number` that specifies the number of velocity iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property velocityIterations
     * @type number
     * @default 4
     */

    /**
     * An integer `Number` that specifies the number of constraint iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     * The default value of `2` is usually very adequate.
     *
     * @property constraintIterations
     * @type number
     * @default 2
     */

    /**
     * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
     * Sleeping can improve stability and performance, but often at the expense of accuracy.
     *
     * @property enableSleeping
     * @type boolean
     * @default false
     */

    /**
     * An `Object` containing properties regarding the timing systems of the engine.
     *
     * @property timing
     * @type object
     */

    /**
     * A `Number` that specifies the global scaling factor of time for all bodies.
     * A value of `0` freezes the simulation.
     * A value of `0.1` gives a slow-motion effect.
     * A value of `1.2` gives a speed-up effect.
     *
     * @property timing.timeScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the current simulation-time in milliseconds starting from `0`.
     * It is incremented on every `Engine.update` by the given `delta` argument.
     *
     * @property timing.timestamp
     * @type number
     * @default 0
     */

    /**
     * A `Number` that represents the total execution time elapsed during the last `Engine.update` in milliseconds.
     * It is updated by timing from the start of the last `Engine.update` call until it ends.
     *
     * This value will also include the total execution time of all event handlers directly or indirectly triggered by the engine update.
     *
     * @property timing.lastElapsed
     * @type number
     * @default 0
     */

    /**
     * A `Number` that represents the `delta` value used in the last engine update.
     *
     * @property timing.lastDelta
     * @type number
     * @default 0
     */

    /**
     * A `Matter.Detector` instance.
     *
     * @property detector
     * @type detector
     * @default a Matter.Detector instance
     */

    /**
     * A `Matter.Grid` instance.
     *
     * @deprecated replaced by `engine.detector`
     * @property grid
     * @type grid
     * @default a Matter.Grid instance
     */

    /**
     * Replaced by and now alias for `engine.grid`.
     *
     * @deprecated replaced by `engine.detector`
     * @property broadphase
     * @type grid
     * @default a Matter.Grid instance
     */

    /**
     * The root `Matter.Composite` instance that will contain all bodies, constraints and other composites to be simulated by this engine.
     *
     * @property world
     * @type composite
     * @default a Matter.Composite instance
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * An optional gravitational acceleration applied to all bodies in `engine.world` on every update.
     *
     * This models a [uniform gravitational field](https://en.wikipedia.org/wiki/Gravity_of_Earth), similar to near the surface of a planet. For gravity in other contexts, disable this and apply forces as needed.
     *
     * To disable set the `scale` component to `0`.
     *
     * This is split into three components for ease of use:
     * a normalised direction (`x` and `y`) and magnitude (`scale`).
     *
     * @property gravity
     * @type object
     */

    /**
     * The gravitational direction normal `x` component, to be multiplied by `gravity.scale`.
     *
     * @property gravity.x
     * @type object
     * @default 0
     */

    /**
     * The gravitational direction normal `y` component, to be multiplied by `gravity.scale`.
     *
     * @property gravity.y
     * @type object
     * @default 1
     */

    /**
     * The magnitude of the gravitational acceleration.
     *
     * @property gravity.scale
     * @type object
     * @default 0.001
     */
};

module.exports = init;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var Vector = __webpack_require__(1);
var Collision = __webpack_require__(10);
var Bounds = __webpack_require__(3);
var Bodies = __webpack_require__(9);
var Vertices = __webpack_require__(2);

/**
 * The `Matter.Query` module contains methods for performing collision queries.
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 *
 * @class Query
 */

var init = function () {
    'worklet';

    if (global.Matter && global.Matter.Query) {
        return;
    }

    if (!global.Matter) {
        global.Matter = {};
    }

    global.Matter.Query = {};

    var Query = global.Matter.Query;

    Vector();
    Collision();
    Bounds();
    Bodies();
    Vertices();

    /**
     * Returns a list of collisions between `body` and `bodies`.
     * @method collides
     * @param {body} body
     * @param {body[]} bodies
     * @return {collision[]} Collisions
     */
    Query.collides = function (body, bodies) {
        var collisions = [],
            bodiesLength = bodies.length,
            bounds = body.bounds,
            collides = global.Matter.Collision.collides,
            overlaps = global.Matter.Bounds.overlaps;

        for (var i = 0; i < bodiesLength; i++) {
            var bodyA = bodies[i],
                partsALength = bodyA.parts.length,
                partsAStart = partsALength === 1 ? 0 : 1;

            if (overlaps(bodyA.bounds, bounds)) {
                for (var j = partsAStart; j < partsALength; j++) {
                    var part = bodyA.parts[j];

                    if (overlaps(part.bounds, bounds)) {
                        var collision = collides(part, body);

                        if (collision) {
                            collisions.push(collision);
                            break;
                        }
                    }
                }
            }
        }

        return collisions;
    };

    /**
     * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
     * @method ray
     * @param {body[]} bodies
     * @param {vector} startPoint
     * @param {vector} endPoint
     * @param {number} [rayWidth]
     * @return {collision[]} Collisions
     */
    Query.ray = function (bodies, startPoint, endPoint, rayWidth) {
        rayWidth = rayWidth || 1e-100;

        var rayAngle = global.Matter.Vector.angle(startPoint, endPoint),
            rayLength = global.Matter.Vector.magnitude(
                global.Matter.Vector.sub(startPoint, endPoint)
            ),
            rayX = (endPoint.x + startPoint.x) * 0.5,
            rayY = (endPoint.y + startPoint.y) * 0.5,
            ray = global.Matter.Bodies.rectangle(
                rayX,
                rayY,
                rayLength,
                rayWidth,
                { angle: rayAngle }
            ),
            collisions = Query.collides(ray, bodies);

        for (var i = 0; i < collisions.length; i += 1) {
            var collision = collisions[i];
            collision.body = collision.bodyB = collision.bodyA;
        }

        return collisions;
    };

    /**
     * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
     * @method region
     * @param {body[]} bodies
     * @param {bounds} bounds
     * @param {bool} [outside=false]
     * @return {body[]} The bodies matching the query
     */
    Query.region = function (bodies, bounds, outside) {
        var result = [];

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                overlaps = global.Matter.Bounds.overlaps(body.bounds, bounds);
            if ((overlaps && !outside) || (!overlaps && outside))
                result.push(body);
        }

        return result;
    };

    /**
     * Returns all bodies whose vertices contain the given point, from the given set of bodies.
     * @method point
     * @param {body[]} bodies
     * @param {vector} point
     * @return {body[]} The bodies matching the query
     */
    Query.point = function (bodies, point) {
        var result = [];

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (global.Matter.Bounds.contains(body.bounds, point)) {
                for (
                    var j = body.parts.length === 1 ? 0 : 1;
                    j < body.parts.length;
                    j++
                ) {
                    var part = body.parts[j];

                    if (
                        global.Matter.Bounds.contains(part.bounds, point) &&
                        global.Matter.Vertices.contains(part.vertices, point)
                    ) {
                        result.push(body);
                        break;
                    }
                }
            }
        }

        return result;
    };
};

module.exports = init;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var Composite = __webpack_require__(7);
var Common = __webpack_require__(0);

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


/***/ })
/******/ ]);
});