var Vector = require('../geometry/Vector');
var Common = require('../core/Common');

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
