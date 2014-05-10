"use strict";

var express = require('express');
var router = express.Router();

var EventController = require('./../../controllers/private/EventController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

router.get('/', function (req, res, next) {
    EventController.findAllEvents(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    EventController.findEventById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/', function (req, res, next) {
    EventController.createEvent(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/:id', function (req, res, next) {
    EventController.updateEventById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/:id', function (req, res, next) {
    EventController.removeEventById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;