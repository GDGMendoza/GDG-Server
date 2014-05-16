"use strict";

var User = require('./../models/User');
var ErrorProvider = require('./../providers/ErrorProvider');
var _ = require('lodash-node');

var publicInterface = {};

publicInterface.findAllContributors = function (data, callback) {
    User.find({})
        .select('email name title company googlePlus facebook twitter photo')
        .exec(function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            var data = {};
            _.each(doc, function (item) {
                data[item.email] = item;
            });
            return callback(false, data);
        });
};

publicInterface.findContributorByEmail = function (data, callback) {
    if (!data || !data.email) return callback(ErrorProvider.getMissingParametersError());
    User.findOne({ email: data.email },
        'email name title company googlePlus facebook twitter photo',
        function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            var data = {};
            if(doc) data[doc.email] = doc;
            return callback(false, data);
        }
    );
};

module.exports = publicInterface;