"use strict";

var express = require('express');
var router = express.Router();

var PostController = require('./../../controllers/private/PostController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

//TODO: ruta que valide en "tiempo real" disponibilidad de titulo

router.get('/', function (req, res, next) {
    PostController.findAllPosts({}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    PostController.findPostById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/:id', function (req, res, next) {
    var data = req.body;
    data._id = req.params.id;
    PostController.updatePostById(data, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/', function (req, res, next) {
    PostController.createPost(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/:id', function (req, res, next) {
    PostController.removePostById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;