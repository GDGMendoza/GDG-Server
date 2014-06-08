"use strict";

var router = require('express').Router();
var ErrorProvider = require('./../../providers/error-provider');
var _ = require('lodash-node');

module.exports = function (TagModel, io) {

    router.get('/', function (req, res, next) {
        TagModel.find({})
            .exec(function (err, doc) {
                if (err) return next(ErrorProvider.getDatabaseError());
                var data = {};
                _.each(doc, function (item) {
                    data[item._id] = item;
                });
                return res.json(data);
            });
    });

    router.get('/:id', function (req, res, next) {
        if (!req.params.id) return next(ErrorProvider.getMissingParametersError());
        TagModel.findOne({ _id: req.params.id })
            .exec(function (err, doc) {
                if (err) return next(ErrorProvider.getDatabaseError());
                var data = {};
                if (doc) data[doc._id] = doc;
                return res.json(data);
            });
    });

    router.post('/', function (req, res, next) {
        if (!req.body.title || !req.body.author || !req.body.content) return next(ErrorProvider.getMissingParametersError());
        TagModel.create(req.body, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());
            return res.json(doc);
        });
    });

    router.put('/:id', function (req, res, next) {
        if (!req.params.id) return next(ErrorProvider.getMissingParametersError());
        TagModel.findOne({_id: req.params.id}, function (err, doc) {
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
        TagModel.findByIdAndRemove(req.params.id, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());
            return res.json(doc);
        });
    });

    return router;

};