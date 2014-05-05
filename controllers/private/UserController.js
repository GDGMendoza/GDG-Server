"use strict";

var User = require('./../../models/User');

var privateInterface = {
    findAllUsers: function (data, callback) {
        User.find({}, function (err, doc) {
            callback(err, doc);
        });
    },
    findUserById: function (id, data, callback) {
        if (id) {
            User.findById(id, function (err, doc) {
                callback(err, doc);
            });
        } else callback(true);
    },
    createUser: function (data, callback) {
        if (data.name && data.email && data.password) {
            User.create(data, function (err, doc) {
                callback(err, doc);
            });
        } else return callback(true);
    },
    updateUserById: function (id, data, callback) {
        if (id) {
            User.findById(id, function (findErr, findDoc) {
                if (!findErr) {
                    for (var key in data) {
                        if (data.hasOwnProperty(key))
                            findDoc[key] = data[key];
                    }
                    findDoc.save(function (saveErr, saveDoc) {
                        callback(saveErr, saveDoc);
                    });
                } else callback(true);
            });
        } else callback(true);
    },
    removeUserById: function (id, data, callback) {
        if (id) {
            User.findByIdAndRemove(id, function (err, doc) {
                callback(err, doc);
            });
        } else callback(true);
    }
};

module.exports = privateInterface;