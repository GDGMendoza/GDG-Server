"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../../controllers/UserController');

var jwt = require('jsonwebtoken');
var config = require('./../../local');

router.post('/register', function (req, res) {
    //TODO: Maybe use gravatar API
    UserController.public.createUser(req.body, function (err, dataForToken) {
        if (!err) res.json({ token: jwt.sign(dataForToken, config.secret, { expiresInMinutes: 60 * 5 }) });
        else res.json(500, { error: 'Ocurrió un error al realizar la consulta' });
    });
});

router.post('/login', function (req, res) {
    UserController.public.login(req.body, function(err, dataForToken){
        if (!err) res.json({ token: jwt.sign(dataForToken, config.secret, { expiresInMinutes: 60 * 5 }) });
        else res.json(401, { error: 'Error al logear' });
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