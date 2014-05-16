"use strict";

var UserController = require('./../controllers/UserController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {};

socketRouter.findAll = function (callback) {
    UserController.findAllContributors({}, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion findAll del socket " + socket.id);
};

module.exports = socketRouter;