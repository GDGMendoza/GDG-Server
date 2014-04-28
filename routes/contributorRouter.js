"use strict";

var express = require('express');
var router = express.Router();

var UserController = require('./../controllers/UserController');
var globals = require('./../global');

router.get('/', function (req, res) {
    UserController.public.findAllContributors(null, globals.defaultHttpResponseHandler(res));
});

router.get('/:id', function (req, res) {
    UserController.public.findContributorById({ id: req.params.id }, globals.defaultHttpResponseHandler(res));
});

/*
 function(err, doc){
 if (!err) res.json(doc);
 else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
 }
*/
module.exports = router;