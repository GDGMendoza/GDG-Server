"use strict";

var express = require('express');
var router = express.Router();

var PostController = require('./../controllers/PostController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

router.get('/', function (req, res, next) {
    PostController.findPostsByPage({ page: req.query.page }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:dashedTitle', function (req, res, next) {
    PostController.findPostByDashedTitle({ dashedTitle: req.params.dashedTitle }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;