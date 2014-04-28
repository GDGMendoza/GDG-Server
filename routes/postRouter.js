"use strict";

var express = require('express');
var router = express.Router();

var PostController = require('./../controllers/PostController');
var globals = require('./../global');

router.get('/', function (req, res) {
    PostController.public.findPostsByPage({ page: req.query.page }, globals.defaultHttpResponseHandler(res));
});

router.get('/:id', function (req, res) {
    PostController.public.findPostById({ id: req.params.id }, globals.defaultHttpResponseHandler(res));
});

router.post('/:id/comment', function (req, res) {
    //TODO: comment logic inside router && controller
    res.json(500, { error: 'Feature aún no implementada' });
});

module.exports = router;