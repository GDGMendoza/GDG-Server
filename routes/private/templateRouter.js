"use strict";

var express = require('express');
var router = express.Router();

var TemplateController = require('./../../controllers/private/TemplateController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

router.get('/', function (req, res, next) {
    TemplateController.findAllTemplates(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.get('/:id', function (req, res, next) {
    TemplateController.findTemplateById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.post('/', function (req, res, next) {
    TemplateController.createTemplate(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/:id', function (req, res, next) {
    TemplateController.updateTemplateById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.delete('/:id', function (req, res, next) {
    TemplateController.removeTemplateById(req.params.id, req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;