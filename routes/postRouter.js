"use strict";

var express = require('express');
var router = express.Router();

var PostController = require('./../controllers/PostController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

router.get('/', function (req, res, next) {
    PostController.findPostsByPage({ page: req.query.page }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    PostController.findPostById({ id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});
/*
router.post('/:id/comment', function (req, res, next) {

});
*/
module.exports = router;