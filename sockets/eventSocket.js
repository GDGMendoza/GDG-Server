"use strict";

var EventController = require('./../controllers/EventController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {};

socketRouter.findByDashedTitle = function (data, callback) {
    EventController.findEventByDashedTitle({ dashedTitle: data.dashedTitle }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion find del socket " + socket.id);
};

socketRouter.findByPage = function (data, callback) {
    EventController.findEventsByPage({ page: data.page }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion findByPage del socket " + socket.id);
};

module.exports = socketRouter;