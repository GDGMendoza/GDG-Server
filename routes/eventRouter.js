"use strict";

var express = require('express');
var router = express.Router();

var EventController = require('./../controllers/EventController');
var globals = require('./../global');

router.get('/', function (req, res, next) {
    EventController.public.findEventsByPage({ page: req.query.page }, globals.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    EventController.public.findEventById({ id: req.params.id }, globals.defaultHttpResponseHandler(res, next));
});

module.exports = router;