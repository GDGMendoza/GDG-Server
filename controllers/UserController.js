"use strict";

var User = require('./../models/User');
var ErrorProvider = require('./../providers/ErrorProvider');

var config = require('./../local');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var bcrypt = require('bcrypt');

var googleapis = require('googleapis');
var gclient = false;
googleapis.discover('plus', 'v1')
    .execute(function (err, client) {
        if (!err) gclient = client;
        else ErrorProvider.consoleGoogleAPIsError();
    });

var publicInterface = {
    findAllContributors: function (data, callback) {
        User.find({ rank: 'contributor' },
            'name title company googlePlus facebook twitter photo googleMap',
            function (err, doc) {
                if (!err) return callback(false, doc);
                else return callback(ErrorProvider.getDatabaseError());
            }
        );
    },
    findContributorById: function (data, callback) {
        if (data.id) {
            User.findOne({ _id: data.id, rank: 'contributor' },
                'name title company googlePlus facebook twitter photo googleMap',
                function (err, doc) {
                    if (!err) return callback(false, doc);
                    else return callback(ErrorProvider.getDatabaseError());
                }
            );
        } else return callback(ErrorProvider.getMissingParametersError());
    },
    login: function (data, callback) {
        if (data.user.email && data.user.password) {
            var standarizedEmail = data.user.email.trim().toLowerCase();
            User.findOne({ email: standarizedEmail }, function (err, doc) {
                if (!err) {
                    bcrypt.compare(data.user.password, doc.password, function (err, isMatch) {
                        if (!err) {
                            if (isMatch) {
                                var dataForToken = { _id: doc._id, email: doc.email, rank: doc.rank };
                                return callback(false, { token: jwt.sign(dataForToken, config.jwtSecret, { expiresInMinutes: 60 * 5 }) });
                            } else return callback(ErrorProvider.getLoginError());
                        } else return callback(ErrorProvider.getSaltError());
                    });
                } else return callback(ErrorProvider.getDatabaseError());
            });
        } else return callback(ErrorProvider.getMissingParametersError());
    },
    createUser: function (data, callback) {
        if (data.user.name && data.user.email && data.user.password) {
            var standarizedEmail = data.user.email.trim().toLowerCase();

            var gravatarMD5 = crypto.createHash('md5').update(standarizedEmail).digest('hex');
            var gravatarURL = '//www.gravatar.com/avatar/' + gravatarMD5;

            bcrypt.genSalt(function (err, salt) {
                if (!err) {
                    bcrypt.hash(data.user.password, salt, function (err, encryptedPassword) {
                        if (!err) {
                            User.create({ name: data.user.name, email: standarizedEmail, password: encryptedPassword, photo: gravatarURL }, function (err, doc) {
                                if (!err) {
                                    //TODO: iniciar proceso de confirmación de creación por correo!!!
                                    var dataForToken = { _id: doc._id, email: doc.email, rank: doc.rank };
                                    return callback(false, { token: jwt.sign(dataForToken, config.jwtSecret, { expiresInMinutes: 60 * 5 }) });
                                } else return callback(ErrorProvider.getDatabaseError());
                            });
                        } else return callback(ErrorProvider.getSaltError());
                    });
                } else return callback(ErrorProvider.getSaltError());
            });
        } else return callback(ErrorProvider.getMissingParametersError());
    },
    googleSignIn: function (data, callback) {
        var oauth2 = new googleapis.OAuth2Client(config.google.clientId, config.google.secret, 'postmessage');
        oauth2.getToken(data.code, function (err, tokens) {
            if (!err && gclient) {
                oauth2.credentials = tokens;
                gclient.plus.people.get({userId: 'me'})
                    .withAuthClient(oauth2)
                    .execute(function (err, result) {
                        if (!err) {
                            //TODO: FALTA LÓGICA
                            //usan idg+ y guardan oauth2 y result
                            callback({data: result});
                        } else ErrorProvider.consoleGoogleAPIsError();
                    });
            } else ErrorProvider.consoleGoogleAPIsError();
        });
    }
};

module.exports = publicInterface;