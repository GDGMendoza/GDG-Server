"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');

var jwt = require('jsonwebtoken');
var config = require('./../local');

router.post('/register', function (req, res, next) {
    //TODO: Maybe use gravatar API
    UserController.public.createUser({ user: req.body }, function (err, dataForToken) {
        if (!err) res.json({ token: jwt.sign(dataForToken, config.jwtSecret, { expiresInMinutes: 60 * 5 }) });
        else next(err);
    });
});

router.post('/login', function (req, res, next) {
    UserController.public.login({ user: req.body }, function(err, dataForToken){
        if (!err) res.json({ token: jwt.sign(dataForToken, config.jwtSecret, { expiresInMinutes: 60 * 5 }) });
        else next(err);
    });
});

router.post('/logout', function (req, res) {
    //TODO logout logic
});

/*
//TODO sign-up w/ Google Plus && Facebook && Twitter
acá iría el sign-in/up mediante G+,fb,tw

 */

module.exports = router;