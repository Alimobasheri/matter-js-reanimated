/**
 * The `MatterReanimated.Contact` module contains methods for creating and manipulating collision contacts.
 *
 * @class Contact
 */

var init = function () {
    'worklet';

    if (global.MatterReanimated && global.MatterReanimated.Contact) {
        return;
    }

    if (!global.MatterReanimated) {
        global.MatterReanimated = {};
    }

    global.MatterReanimated.Contact = {};

    var Contact = global.MatterReanimated.Contact;

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
