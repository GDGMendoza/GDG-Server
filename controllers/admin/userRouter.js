"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../../controllers/private/UserController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

//TODO: GMap selector @ client
//TODO: G+/fb/tw share @ contentmanager

router.get('/', function (req, res, next) {
    UserController.findAllUsers({}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    UserController.findUserById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/', function (req, res, next) {
    UserController.createUser(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/:id', function (req, res, next) {
    var data = req.body;
    data._id = req.params.id;
    UserController.updateUserById(data, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/:id', function (req, res, next) {
    UserController.removeUserById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;