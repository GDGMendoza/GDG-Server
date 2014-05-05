"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');

var config = require('./../local');
var jwt = require('jsonwebtoken');

var googleapis = require('googleapis');
var gclient = false;
googleapis.discover('plus', 'v1')
    .execute(function (err, client) {
        if (!err) gclient = client
    });

router.post('/register', function (req, res, next) {
    //TODO: Maybe use gravatar API
    UserController.createUser({ user: req.body }, function (err, dataForToken) {
        if (!err) res.json({ token: jwt.sign(dataForToken, config.jwtSecret, { expiresInMinutes: 60 * 5 }) });
        else next(err);
    });
});

router.post('/login', function (req, res, next) {
    UserController.login({ user: req.body }, function (err, dataForToken) {
        if (!err) res.json({ token: jwt.sign(dataForToken, config.jwtSecret, { expiresInMinutes: 60 * 5 }) });
        else next(err);
    });
});

router.post('/googleSignIn', function (req, res, next) {
    var oauth2 = new googleapis.OAuth2Client(config.google.clientId, config.google.secret, 'postmessage');

    function onResponseFromGoogle (err, result){
        if (!err) {
            res.json({data: result});

            //usan idg+ y guardan oauth2 y result
        }
    }

    oauth2.getToken(req.body.code, function (err, tokens) {
        if (!err && gclient) {
            oauth2.credentials = tokens;
            gclient.plus.people.get({userId: 'me'})
                .withAuthClient(oauth2)
                .execute(onResponseFromGoogle);
        }
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