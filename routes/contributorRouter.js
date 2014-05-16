"use strict";

var router = require('express').Router();

module.exports = function(UserModel){

    var UserController = require('./../controllers/UserController')(UserModel);
    var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

    router.get('/', function (req, res, next) {
        UserController.findAllContributors({}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
    });

    return router;

};