"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');
var globals = require('./../global');

router.get('/', function (req, res, next) {
    UserController.findAllContributors({}, globals.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    UserController.findContributorById({ id: req.params.id }, globals.defaultHttpResponseHandler(res, next));
});

module.exports = router;