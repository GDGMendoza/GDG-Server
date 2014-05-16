"use strict";

var router = require('express').Router();

module.exports = function(EventModel){

    var EventController = require('./../controllers/EventController')(EventModel);
    var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

    //TODO: Agregar a Google Calendar || posiblemente sea logica del cliente

    router.get('/', function (req, res, next) {
        EventController.findEventsByPage({ page: req.query.page }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
    });

    router.get('/:uniqueTitle', function (req, res, next) {
        EventController.findEventByUniqueTitle({ uniqueTitle: req.params.uniqueTitle }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
    });

    return router;

};