"use strict";

var UserController = require('./../controllers/UserController');
var globals = require('./../global');

var socketRouter = {

    findById: function (id, callback) {
        UserController.public.findContributorById({ id: id }, globals.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion find del socket " + socket.id);
    },

    findAll: function (callback) {
        UserController.public.findAllContributors(null, globals.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion findAll del socket " + socket.id);
    }

}

module.exports = socketRouter;