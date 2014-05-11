"use strict";

var express = require('express');
var router = express.Router();

var EventController = require('./../../controllers/private/EventController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

router.get('/', function (req, res, next) {
    EventController.findAllEvents({}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    EventController.findEventById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/:id', function (req, res, next) {
    var data = req.body;
    data._id = req.params.id;
    EventController.updateEventById(data, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/', function (req, res, next) {
    EventController.createEvent(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/:id', function (req, res, next) {
    EventController.removeEventById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;