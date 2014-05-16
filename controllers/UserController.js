"use strict";

var User = require('./../models/User');
var ErrorProvider = require('./../providers/ErrorProvider');
var _ = require('lodash-node');

var publicInterface = {};

publicInterface.findAllContributors = function (data, callback) {
    User.find({})
        .select('_id email name title company googlePlus facebook twitter photo')
        .exec(function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            var data = {};
            _.each(doc, function (item) {
                data[item._id] = item;
            });
            return callback(false, data);
        });
};

module.exports = publicInterface;