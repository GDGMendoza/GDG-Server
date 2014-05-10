"use strict";

var User = require('./../../models/User');
var ErrorProvider = require('./../../providers/ErrorProvider');

var privateInterface = {
    findAllUsers: function (data, callback) {
        User.find({}, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    },
    findUserById: function (data, callback) {
        if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
        User.findOne({_id: data._id}, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    },
    createUser: function (data, callback) {
        if (!data || !data.name || !data.email || !data.password) return callback(ErrorProvider.getMissingParametersError());
        User.create(data, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    },
    updateUserById: function (data, callback) {
        if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
        User.findOne({_id: data._id}, function (findErr, findDoc) {
            if (findErr) return callback(ErrorProvider.getDatabaseError());
            for (var key in data) {
                if (data.hasOwnProperty(key))
                    findDoc[key] = data[key];
            }
            findDoc.save(function (saveErr, saveDoc) {
                if (saveErr) return callback(ErrorProvider.getDatabaseError());
                return callback(false, saveDoc);
            });
        });

    },
    removeUserById: function (data, callback) {
        if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
        User.findByIdAndRemove(data._id, function (err, doc) {
            if(err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    }
};

module.exports = privateInterface;