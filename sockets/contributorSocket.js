"use strict";

var UserController = require('./../controllers/UserController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {};

socketRouter.findById = function (data, callback) {
    UserController.findContributorById(data, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion find del socket " + socket.id);
};

socketRouter.findAll = function (callback) {
    UserController.findAllContributors({}, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion findAll del socket " + socket.id);
};

module.exports = socketRouter;