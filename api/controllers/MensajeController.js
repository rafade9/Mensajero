/**
 * MensajeController
 *
 * @description :: Server-side logic for managing mensajes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require("q");
module.exports = {

    subscribe: function (req, res) {
        if (req.isSocket) {
            console.log("Entra a chat");
            //console.log("Se ejecutaron los queris: ", result);
            var roomName = 'chat';
            sails.sockets.join(req.socket, roomName);
            console.log(sails.sockets.subscribers());
            res.json({
                code: 1
            });

        } else {
            res.json(500, {
                error: "Get out!"
            })
        }
    }
};
