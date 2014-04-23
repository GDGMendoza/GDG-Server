"use strict";

var User = require('./../models/User');

module.exports = {
    public: {
        findAllContributors: function (data, callback) {
            User.find({ rank: 'contributor' },
                'name title company googlePlus facebook twitter photo googleMap',
                function (err, doc) {
                    callback(err, doc);
                }
            );
        },
        findUserById: function (id, data, callback) {
            if (id) {
                User.findById(id,
                    'name title company googlePlus facebook twitter photo googleMap',
                    function (err, doc) {
                        callback(err, doc);
                    }
                );
            } else callback(true);
        },
        createUser: function (data, callback) {
            if (data.name && data.email && data.password) {
                User.create({ name: data.name, email: data.email, password: data.password }, function (err, doc) {
                    if (!err) {
                        //TODO: iniciar proceso de confirmación de creación por correo!!!
                        return callback(false, { email: doc.email, rank: doc.rank });
                    } else return callback(true);
                });
            } else return callback(true);
        },
        login: function (data, callback) {
            if (data.email && data.password) {
                User.findOne({ email: data.email }, function (err, doc) {
                    if (!err) {
                        doc.comparePassword(data.password, function (isMatch) {
                            if (isMatch) return callback(false, { email: doc.email, rank: doc.rank });
                            else return callback(true);
                        });
                    } else return callback(true);
                });
            } else return callback(true);
        }
    },
    private: {
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
    }
};