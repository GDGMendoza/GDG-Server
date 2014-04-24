"use strict";

var express = require('express');
var router = express.Router();

var TemplateController = require('./../../controllers/TemplateController');

router.get('/', function (req, res) {
    TemplateController.private.findAllTemplates(req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.get('/:id', function (req, res) {
    TemplateController.private.findTemplateById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.post('/', function (req, res) {
    TemplateController.private.createTemplate(req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.put('/:id', function (req, res) {
    TemplateController.private.updateTemplateById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.delete('/:id', function (req, res) {
    TemplateController.private.removeTemplateById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

module.exports = router;