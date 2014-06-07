"use strict";

var router = require('express').Router();
var ErrorProvider = require('./../providers/error-provider');
var _ = require('lodash-node');

module.exports = function(UserModel){

    router.get('/', function (req, res, next) {
        UserModel.find({})
            .select('_id email name title company googlePlus facebook twitter photo')
            .exec(function (err, doc) {
                if (err) return next(ErrorProvider.getDatabaseError());
                var data = {};
                _.each(doc, function (item) {
                    data[item._id] = item;
                });
                return res.json(data);
            });
    });

    return router;

};