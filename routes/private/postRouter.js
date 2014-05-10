"use strict";

var express = require('express');
var router = express.Router();

var PostController = require('./../../controllers/private/PostController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

//TODO: ruta que valide en "tiempo real" disponibilidad de titulo

router.get('/', function (req, res, next) {
    PostController.findAllPosts(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    PostController.findPostById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/', function (req, res, next) {
    PostController.createPost(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/:id', function (req, res, next) {
    PostController.updatePostById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/:id', function (req, res, next) {
    PostController.removePostById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;