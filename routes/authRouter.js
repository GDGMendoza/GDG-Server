"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

router.put('/createUser', function (req, res, next) {
    UserController.createUser({ user: req.body }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/login', function (req, res, next) {
    UserController.login({ user: req.body }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

//TODO: retocar llegada de parametros
router.post('/googleSignIn', function (req, res, next) {
    UserController.googleSignIn({ code: req.body.code }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

/*
//TODO logout logic
router.post('/logout', function (req, res) {

});
*/

//TODO sign-up w/ Facebook && Twitter

module.exports = router;