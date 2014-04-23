"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../../controllers/UserController');

router.get('/', function (req, res) {
    UserController.public.findAllContributors(req.body, function(err, doc){
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.get('/:id', function (req, res) {
    UserController.public.findUserById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

module.exports = router;