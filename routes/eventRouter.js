"use strict";

var express = require('express');
var router = express.Router();

var EventController = require('./../controllers/EventController');

router.get('/', function (req, res) {
    EventController.public.findEventsByPage(req.query.page, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.get('/:id', function (req, res) {
    EventController.public.findEventById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

module.exports = router;