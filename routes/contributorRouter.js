"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

router.get('/', function (req, res, next) {
    UserController.findAllContributors({}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    UserController.findContributorById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;