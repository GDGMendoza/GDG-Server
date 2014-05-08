"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

//TODO: Cambiar password
//TODO: Editar perfil
//TODO: Eliminar cuenta
//TODO: Activar/Desactivar follow global
//TODO: Añadir/Quitar tag follow global
//TODO: Desuscribirse completamente de correos

/*
router.get('/', function (req, res, next) {
    UserController.findAllContributors({}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    UserController.findContributorById({ id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});
*/

module.exports = router;