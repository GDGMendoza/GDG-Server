"use strict";

var express = require('express');
var router = express.Router();

var EventController = require('./../controllers/EventController');
var globals = require('./../global');

router.get('/', function (req, res) {
    EventController.public.findEventsByPage({ page: req.query.page }, globals.defaultHttpResponseHandler(res));
});

router.get('/:id', function (req, res) {
    EventController.public.findEventById({ id: req.params.id }, globals.defaultHttpResponseHandler(res));
});

module.exports = router;