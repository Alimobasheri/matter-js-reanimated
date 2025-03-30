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
