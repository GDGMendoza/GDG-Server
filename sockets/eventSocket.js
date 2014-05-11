"use strict";

var EventController = require('./../controllers/EventController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {};

socketRouter.findById = function (data, callback) {
    EventController.findEventById(data, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion find del socket " + socket.id);
};

socketRouter.findByPage = function (data, callback) {
    EventController.findEventsByPage(data, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion findByPage del socket " + socket.id);
};

module.exports = socketRouter;