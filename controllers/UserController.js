"use strict";

var User = require('./../models/User');
var ErrorProvider = require('./../providers/ErrorProvider');
var ConfigurationProvider = require('./../providers/ConfigurationProvider');

var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var bcrypt = require('bcrypt');

var googleapis = require('googleapis');
var gclient = false;
googleapis.discover('plus', 'v1')
    .execute(function (err, client) {
        if (err) ErrorProvider.consoleGoogleAPIsError();
        else gclient = client;
    });

var publicInterface = {
    findAllContributors: function (data, callback) {
        User.find({ rank: 'contributor' },
            'email name title company googlePlus facebook twitter photo',
            function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            }
        );
    },
    findContributorById: function (data, callback) {
        if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
        User.findOne({ _id: data._id, rank: 'contributor' },
            'email name title company googlePlus facebook twitter photo',
            function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            }
        );
    },
    login: function (data, callback) {
        if (!data || !data.user.email || !data.user.password) return callback(ErrorProvider.getMissingParametersError());
        var standarizedEmail = data.user.email.trim().toLowerCase();
        User.findOne({ email: standarizedEmail }, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            bcrypt.compare(data.user.password, doc.password, function (err, isMatch) {
                if (err) return callback(ErrorProvider.getSaltError());
                if (!isMatch) return callback(ErrorProvider.getLoginError());
                var dataForToken = { _id: doc._id, email: doc.email, rank: doc.rank };
                return callback(false, { token: jwt.sign(dataForToken, ConfigurationProvider.jwtSecret, { expiresInMinutes: 60 * 5 }) });
            });
        });
    },
    createUser: function (data, callback) {
        if (!data || !data.user || !data.user.name || !data.user.email || !data.user.password) return callback(ErrorProvider.getMissingParametersError());
        var standarizedEmail = data.user.email.trim().toLowerCase();

        var gravatarMD5 = crypto.createHash('md5').update(standarizedEmail).digest('hex');
        var gravatarURL = '//www.gravatar.com/avatar/' + gravatarMD5;

        bcrypt.genSalt(function (err, salt) {
            if (err) return callback(ErrorProvider.getSaltError());
            bcrypt.hash(data.user.password, salt, function (err, encryptedPassword) {
                if (err) return callback(ErrorProvider.getSaltError());
                User.create({ name: data.user.name, email: standarizedEmail, password: encryptedPassword, photo: gravatarURL }, function (err, doc) {
                    //TODO: iniciar proceso de confirmación de creación por correo!!!
                    if (err) return callback(ErrorProvider.getDatabaseError());
                    var dataForToken = { _id: doc._id, email: doc.email, rank: doc.rank };
                    return callback(false, { token: jwt.sign(dataForToken, ConfigurationProvider.jwtSecret, { expiresInMinutes: 60 * 5 }) });
                });
            });
        });
    },
    googleSignIn: function (data, callback) {
        var oauth2 = new googleapis.OAuth2Client(ConfigurationProvider.google.clientId, ConfigurationProvider.google.secret, 'postmessage');
        oauth2.getToken(data.code, function (err, tokens) {
            if (err || !gclient) return ErrorProvider.getGoogleAPIsError();
            oauth2.credentials = tokens;
            gclient.plus.people.get({ userId: 'me' })
                .withAuthClient(oauth2)
                .execute(function (err, result) {
                    if (err) return ErrorProvider.getGoogleAPIsError();
                    //TODO: FALTA LÓGICA
                    //usan idg+ y guardan oauth2 y result
                    return callback(false, { data: result });
                });
        });
    },
    updateProfile: function (data, callback) {
        if (!data.name || !data.title || !data.company || !data.googlePlus || !data.facebook || !data.twitter) return callback(ErrorProvider.getMissingParametersError());
        User.findOne({_id: data._id}, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            doc.name = data.name;
            doc.title = data.title;
            doc.company = data.company;
            doc.googlePlus = data.googlePlus;
            doc.facebook = data.facebook;
            doc.twitter = data.twitter;
            doc.save(function (saveErr, saveDoc) {
                if (saveErr) return callback(ErrorProvider.getDatabaseError());
                return callback(false, saveDoc);
            });
        })
    },
    findProfile: function (data, callback) {
        User.findOne({_id: data._id},
            'name title company googlePlus facebook twitter photo',
            function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            }
        );
    },
    updatePassword: function (data, callback) {
        if (!data.oldPassword || !data.newPassword) return callback(ErrorProvider.getMissingParametersError());
        User.findOne({_id: data._id}, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            bcrypt.compare(data.oldPassword, doc.password, function (err, isMatch) {
                if (err) return callback(ErrorProvider.getSaltError());
                if (!isMatch) return callback(ErrorProvider.getMissingParametersError());
                bcrypt.genSalt(function (err, salt) {
                    if (err) return callback(ErrorProvider.getSaltError());
                    bcrypt.hash(data.newPassword, salt, function (err, encryptedPassword) {
                        if (err) return callback(ErrorProvider.getSaltError());
                        doc.password = encryptedPassword;
                        doc.save(function (saveErr, saveDoc) {
                            if (saveErr) return callback(ErrorProvider.getDatabaseError());
                            return callback(false, saveDoc);
                        });
                    });
                });
            });
        });
    },
    removeUser: function (data, callback) {
        User.findByIdAndRemove(data._id, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    },
    reverseGlobalSubscription: function (data, callback) {
        User.findOne({_id: data._id}, function (err, doc){
            doc.globalSubscription = !doc.globalSubscription;
            doc.save(function(saveErr, saveDoc){
                if (saveErr) return callback(ErrorProvider.getDatabaseError());
                return callback(false, saveDoc);
            });
        })
    }
};

module.exports = publicInterface;