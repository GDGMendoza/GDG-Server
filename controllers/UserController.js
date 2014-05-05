"use strict";

var User = require('./../models/User');

var publicInterface = {
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
};

module.exports = publicInterface;