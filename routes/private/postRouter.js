"use strict";

var express = require('express');
var router = express.Router();

var PostController = require('./../../controllers/PostController');

router.get('/', function (req, res) {
    PostController.private.findAllPosts(req.body, function(err, doc){
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.get('/:id', function (req, res) {
    PostController.private.findPostById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.post('/', function (req, res) {
    PostController.private.createPost(req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.put('/:id', function (req, res) {
    PostController.private.updatePostById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.delete('/:id', function (req, res) {
    PostController.private.removePostById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

module.exports = router;