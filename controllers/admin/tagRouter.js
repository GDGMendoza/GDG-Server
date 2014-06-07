"use strict";

var express = require('express');
var router = express.Router();

var TagController = require('./../../controllers/private/TagController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

router.get('/', function (req, res, next) {
    TagController.findAllTags({}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    TagController.findTagById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/:id', function (req, res, next) {
    var data = req.body;
    data._id = req.params.id;
    TagController.updateTagById(data, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/', function (req, res, next) {
    TagController.createTag(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/:id', function (req, res, next) {
    TagController.removeTagById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;