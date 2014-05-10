"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../../controllers/private/UserController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

//TODO: GMap selector @ client
//TODO: G+/fb/tw share @ contentmanager

router.get('/', function (req, res, next) {
    UserController.findAllUsers(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    UserController.findUserById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/', function (req, res, next) {
    UserController.createUser(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/:id', function (req, res, next) {
    UserController.updateUserById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/:id', function (req, res, next) {
    UserController.removeUserById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;