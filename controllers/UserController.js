"use strict";

var User = require('./../models/User');
var ErrorProvider = require('./../providers/ErrorProvider');

var publicInterface = {};

publicInterface.findAllContributors = function (data, callback) {
    User.find({},
        'email name title company googlePlus facebook twitter photo',
        function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        }
    );
};

publicInterface.findContributorById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    User.findOne({ _id: data._id },
        'email name title company googlePlus facebook twitter photo',
        function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        }
    );
};

module.exports = publicInterface;