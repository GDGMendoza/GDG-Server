"use strict";

var express = require('express');
var router = express.Router();

var TagController = require('./../controllers/TagController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

//TODO: Activar/Desactivar follow global +
//TODO: Añadir/Quitar tag follow global +
//TODO: Desuscribirse completamente de correos

/**
 * Reverse full subscription
 */
router.post('/', function (req, res, next) {
    TagController.reverseGlobalSubscription(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

/**
 * Reverse tag subscription
 */
router.post('/:tag/', function (req, res, next) {
    var data = req.body;
    data.tag = req.params.tag;
    TagController.reverseTagSubscription(data, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;