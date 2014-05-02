"use strict";

var User = require('./../models/User');

module.exports = {
    public: {
        findAllContributors: function (data, callback) {
            User.find({ rank: 'contributor' },
                'name title company googlePlus facebook twitter photo googleMap',
                function (err, doc) {
                    return callback(err, doc);
                }
            );
        },
        findContributorById: function (data, callback) {
            if (data.id) {
                User.findOne({ _id: data.id, rank: 'contributor' },
                    'name title company googlePlus facebook twitter photo googleMap',
                    function (err, doc) {
                        return callback(err, doc);
                    }
                );
            } else return callback(true);
        },
        createUser: function (data, callback) {
            if (data.user.name && data.user.email && data.user.password) {
                User.create({ name: data.user.name, email: data.user.email, password: data.user.password }, function (err, doc) {
                    if (!err) {
                        //TODO: iniciar proceso de confirmación de creación por correo!!!
                        return callback(false, { _id: doc._id, email: doc.email, rank: doc.rank });
                    } else {
                        return callback(err);
                    }
                });
            } else {
                var err = new Error('Missing data');
                err.status = 400;
                return callback(err);
            }
        },
        login: function (data, callback) {
            if (data.user.email && data.user.password) {
                User.findOne({ email: data.user.email }, function (err, doc) {
                    if (!err) {
                        doc.comparePassword(data.user.password, function (isMatch) {
                            if (isMatch) return callback(false, { _id: doc._id, email: doc.email, rank: doc.rank });
                            else {
                                var err = new Error('Wrong password');
                                err.status = 401;
                                return callback(err);
                            }
                        });
                    } else return callback(err);
                });
            } else {
                var err = new Error('Missing data');
                err.status = 401;
                return callback(err);
            }
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