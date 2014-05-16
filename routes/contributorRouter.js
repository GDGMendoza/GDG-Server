"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

router.get('/', function (req, res, next) {
    UserController.findAllContributors({}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:email', function (req, res, next) {
    UserController.findContributorByEmail({ email: req.params.email }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;