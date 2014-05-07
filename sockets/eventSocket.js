"use strict";

var EventController = require('./../controllers/EventController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {

    findById: function (id, callback) {
        EventController.findEventById({ id: id }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion find del socket " + socket.id);
    },

    findByPage: function (page, callback) {
        EventController.findEventsByPage({ page: page }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion findByPage del socket " + socket.id);
    }

};

module.exports = socketRouter;