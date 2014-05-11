"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

//TODO: Activar/Desactivar follow global +
//TODO: Añadir/Quitar tag follow global +
//TODO: Desuscribirse completamente de correos

/**
 * Reverse full subscription
 */
router.post('/', function (req, res, next) {
    UserController.reverseGlobalSubscription(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

/**
 * Reverse tag subscription
 */
router.post('/:tag/', function (req, res, next) {
    UserController.reverseTagSubscription(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;