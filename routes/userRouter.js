"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

//TODO: Obtener perfil +
//TODO: Cambiar password +
//TODO: Editar perfil +
//TODO: Eliminar cuenta +
//TODO: Activar/Desactivar follow global +
//TODO: Añadir/Quitar tag follow global
//TODO: Desuscribirse completamente de correos
//TODO: Adaptar modelo de login para que rechace cuentas creadas con SignIn

router.post('/', function (req, res, next) {
    var data = req.body;
    data._id = req.user._id;
    UserController.updateProfile(data, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/updatePassword', function (req, res, next) {
    var data = req.body;
    data._id = req.user._id;
    UserController.updatePassword(data, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/reverseGlobalSubscription', function (req, res, next) {
    UserController.reverseGlobalSubscription({_id: req.user._id}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/', function (req, res, next) {
    UserController.findProfile({_id: req.user._id}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/', function (req, res, next) {
    UserController.removeUser({_id: req.user._id}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

/*
 router.get('/:id', function (req, res, next) {
 UserController.findContributorById({ id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
 });
 */

module.exports = router;