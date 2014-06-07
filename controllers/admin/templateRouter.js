"use strict";

var express = require('express');
var router = express.Router();

var TemplateController = require('./../../controllers/private/TemplateController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

router.get('/', function (req, res, next) {
    TemplateController.findAllTemplates({}, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    TemplateController.findTemplateById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/:id', function (req, res, next) {
    var data = req.body;
    data._id = req.params.id;
    TemplateController.updateTemplateById(data, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/', function (req, res, next) {
    TemplateController.createTemplate(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/:id', function (req, res, next) {
    TemplateController.removeTemplateById({ _id: req.params.id }, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;