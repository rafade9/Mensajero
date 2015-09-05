/**
 * MensajeController
 *
 * @description :: Server-side logic for managing mensajes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require("q");
var users = [];
module.exports = {

    subscribe: function (req, res) {
        if (req.isSocket) {
            var user = req.params.all();

            var roomName = 'chat';
            sails.sockets.join(req.socket, roomName);
            console.log(sails.sockets.subscribers());
            users.push({
                username: user.username,
                uid: req.socket.id
            });
            sails.sockets.broadcast("chat", "updatedUsers", users);
            sails.sockets.broadcast("chat", "mensajes", {
                msg: user.username + ' se ha conectado.',
                tipo: 1
            });
            res.json({
                code: 1,
                users: users
            });

        } else {
            res.json(500, {
                error: "Get out!"
            })
        }
    },

    privateMsg: function (req, res) {
        if (req.isSocket) {
            var data = req.params.all();
            console.log("Entra a msg privado para: " + data.uid);
            sails.sockets.emit(data.uid, 'privateMesage', {
                msgP: 'Hola'
            });
            res.json({
                code: 1
            });
        }
    },

    leave: function (req, res) {
        if (req.isSocket) {
            sails.sockets.leave(req.socket, 'chat');
            var userToRemove;
            for (var u in users) {
                if (users[u].uid === req.socket.id) {
                    sails.sockets.broadcast("chat", "mensajes", {
                        msg: users[u].username + ' se ha desconectado.',
                        tipo: 1
                    });
                    userToRemove = users[u];
                }
            }
            users.splice(users.indexOf(userToRemove), 1);
            sails.sockets.broadcast("chat", "updatedUsers", users);
            res.json({
                code: 1
            });
        }
    }
};
