"use strict";

var router = require('express').Router();

module.exports = function(PostModel){

    var PostController = require('./../controllers/PostController')(PostModel);
    var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

    router.get('/', function (req, res, next) {
        PostController.findPostsByPage({ page: req.query.page }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
    });

    router.get('/:uniqueTitle', function (req, res, next) {
        PostController.findPostByUniqueTitle({ uniqueTitle: req.params.uniqueTitle }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
    });

    return router;

};