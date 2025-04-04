var Pair = require('./Pair');
var Common = require('../core/Common');

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
