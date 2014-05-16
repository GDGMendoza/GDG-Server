"use strict";

module.exports = function(UserModel){

    var UserController = require('./../controllers/UserController')(UserModel);
    var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

    var socketRouter = {};

    socketRouter.findAll = function (callback) {
        UserController.findAllContributors({}, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion findAll del socket " + socket.id);
    };

    return socketRouter;

};