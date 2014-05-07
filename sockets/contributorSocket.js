"use strict";

var UserController = require('./../controllers/UserController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {

    findById: function (id, callback) {
        UserController.findContributorById({ id: id }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion find del socket " + socket.id);
    },

    findAll: function (callback) {
        UserController.findAllContributors({}, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion findAll del socket " + socket.id);
    }

};

module.exports = socketRouter;