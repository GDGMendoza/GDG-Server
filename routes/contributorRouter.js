"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');
var globals = require('./../global');

router.get('/', function (req, res, next) {
    UserController.public.findAllContributors(null, globals.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    UserController.public.findContributorById({ id: req.params.id }, globals.defaultHttpResponseHandler(res, next));
});

module.exports = router;