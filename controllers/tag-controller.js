"use strict";

var router = require('express').Router();
var ErrorProvider = require('./../providers/error-provider');
var _ = require('lodash-node');

module.exports = function(TagModel){

    //TODO: Activar/Desactivar follow global +
    //TODO: Añadir/Quitar tag follow global +
    //TODO: Desuscribirse completamente de correos

    /**
     * Reverse full subscription
     */
    router.post('/', function (req, res, next) {
        /*
        TagModel.findOne({_id: req.body._id}, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());
            doc.globalSubscription = !doc.globalSubscription;
            doc.save(function (saveErr, saveDoc) {
                if (saveErr) return next(ErrorProvider.getDatabaseError());
                return res.json(saveDoc);
            });
        });
        */
    });

    /**
     * Reverse tag subscription
     */
    router.post('/:tag/', function (req, res, next) {
        /*
        TagModel.findOne({tag: req.params.tag}, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());

            var standarizedEmail = req.body.email.trim().toLowerCase();
            var found = false;
            for (var i = 0; i < doc.userSubscriptionList.length; i++) { //revisar
                if (doc.userSubscriptionList[i] == standarizedEmail) {
                    doc.userSubscriptionList.splice(i, 0);
                    found = true;
                    break;
                }
            }
            if (!found) doc.userSubscriptionList.push(standarizedEmail);

            doc.save(function (saveErr, saveDoc) {
                if (saveErr) return next(ErrorProvider.getDatabaseError());
                return req.json(saveDoc);
            });
        });
        */
    });

    return router;

};