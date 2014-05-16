"use strict";

var EventController = require('./../controllers/EventController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {};

socketRouter.findByUniqueTitle = function (data, callback) {
    EventController.findEventByUniqueTitle({ uniqueTitle: data.uniqueTitle }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion find del socket " + socket.id);
};

socketRouter.findByPage = function (data, callback) {
    EventController.findEventsByPage({ page: data.page }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion findByPage del socket " + socket.id);
};

module.exports = socketRouter;