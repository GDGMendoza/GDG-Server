"use strict";

var EventController = require('./../controllers/EventController');
var globals = require('./../global');

var socketRouter = {

    findById: function (id, callback) {
        EventController.public.findEventById({ id: id }, globals.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion find del socket " + socket.id);
    },

    findByPage: function (page, callback) {
        EventController.public.findEventsByPage({ page: page }, globals.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion findByPage del socket " + socket.id);
    }

};

module.exports = socketRouter;