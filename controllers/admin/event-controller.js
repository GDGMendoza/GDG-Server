"use strict";

var router = require('express').Router();
var ErrorProvider = require('./../providers/error-provider');
var _ = require('lodash-node');

module.exports = function (EventModel) {

    //TODO: publicar evento && notificar por correo a suscriptores

    router.get('/', function (req, res, next) {
        EventModel.find({})
            .populate('tags')
            .exec(function (err, doc) {
                if (err) return next(ErrorProvider.getDatabaseError());
                var data = {};
                _.each(doc, function (item) {
                    data[item.uniqueTitle] = item;
                });
                return res.json(data);
            });
    });

    router.get('/:uniqueTitle', function (req, res, next) {
        if (!req.params.uniqueTitle) return next(ErrorProvider.getMissingParametersError());
        EventModel.findOne({ uniqueTitle: req.params.uniqueTitle })
            .populate('tags')
            .exec(function (err, doc) {
                if (err) return next(ErrorProvider.getDatabaseError());
                var data = {};
                if (doc) data[doc.uniqueTitle] = doc;
                return res.json(data);
            });
    });

    router.post('/', function (req, res, next) {
        //TODO: notificar en redes sociales!!!
        if (!req.body.title || !req.body.uniqueTitle || !req.body.eventDate ) return next(ErrorProvider.getMissingParametersError());
        EventModel.create(req.body, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());
            return res.json(doc);
        });
    });

    router.put('/:uniqueTitle', function (req, res, next) {
        if (!req.params.uniqueTitle) return next(ErrorProvider.getMissingParametersError());
        EventModel.findOne({uniqueTitle: req.params.uniqueTitle}, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key))
                    doc[key] = req.body[key];
            }
            doc.modifiedAt = new Date();
            doc.save(function (saveErr, saveDoc) {
                if (saveErr) return next(ErrorProvider.getDatabaseError());
                return res.json(saveDoc);
            });
        });
    });

    router.delete('/:id', function (req, res, next) {
        if (!req.params.id) return next(ErrorProvider.getMissingParametersError());
        EventModel.findByIdAndRemove(req.params.id, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());
            return res.json(doc);
        });
    });

    return router;

};