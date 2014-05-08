"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../../controllers/private/UserController');

//TODO: GMap selector @ client
//TODO: G+/fb/tw share @ contentmanager

router.get('/', function (req, res) {
    UserController.findAllUsers(req.body, function(err, doc){
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.get('/:id', function (req, res) {
    UserController.findUserById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.post('/', function (req, res) {
    UserController.createUser(req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.put('/:id', function (req, res) {
    UserController.updateUserById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.delete('/:id', function (req, res) {
    UserController.removeUserById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

module.exports = router;