"use strict";

var express = require('express');
var router = express.Router();

var PostController = require('./../../controllers/PostController');

router.get('/', function (req, res) {
    PostController.public.findPostsByPage(req.query.page, req.body, function(err, doc){
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.get('/:id', function (req, res) {
    PostController.public.findPostById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.post('/:id/comment', function (req, res) {
    //TODO: comment logic inside router && controller
    res.json(500, { error: 'Feature aún no implementada' });
});

module.exports = router;