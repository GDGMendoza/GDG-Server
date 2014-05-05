"use strict";

var express = require('express');
var router = express.Router();

var PostController = require('./../controllers/PostController');
var globals = require('./../global');

router.get('/', function (req, res, next) {
    PostController.findPostsByPage({ page: req.query.page }, globals.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    PostController.findPostById({ id: req.params.id }, globals.defaultHttpResponseHandler(res, next));
});
/*
router.post('/:id/comment', function (req, res, next) {
    var err = new Error('Unavailable feature');
    next(err);
});
*/
module.exports = router;