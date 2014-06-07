"use strict";

var router = require('express').Router();
var ErrorProvider = require('./../providers/error-provider');
var _ = require('lodash-node');

module.exports = function (EventModel) {

    //TODO: Agregar a Google Calendar || posiblemente sea logica del cliente

    router.get('/', function (req, res, next) {
        var skip = req.query.page ? 10 * (req.query.page - 1) : 0;
        EventModel.find({ active: true })
            .select('cover title uniqueTitle description eventDate difficulty location googlePlusAlbum sessions createdAt modifiedAt')
            .populate('tags', 'name')
            .limit(10).skip(skip)
            .exec(function (err, doc) {
                if (err) return next(ErrorProvider.getDatabaseError());
                var data = {};
                _.each(doc, function (item) {
                    data[item.uniqueTitle] = item;
                });
                return res.json(data);
            }
        );

    });

    router.get('/:uniqueTitle', function (req, res, next) {
        if (!req.params.uniqueTitle) return next(ErrorProvider.getMissingParametersError());
        EventModel.findOne({ uniqueTitle: req.params.uniqueTitle, active: true })
            .select('cover title uniqueTitle description eventDate difficulty location googlePlusAlbum sessions createdAt modifiedAt')
            .populate('tags', 'name')
            .exec(function (err, doc) {
                if (err) return next(ErrorProvider.getDatabaseError());
                var data = {};
                if (doc) data[doc.uniqueTitle] = doc;
                return res.json(data);
            });
    });

    return router;

};