"use strict";

var router = require('express').Router();
var ErrorProvider = require('./../../providers/error-provider');
var _ = require('lodash-node');

module.exports = function (UserModel, io) {

    //TODO: GMap selector @ client
    //TODO: G+/fb/tw share @ contentmanager

    router.get('/', function (req, res, next) {
        UserModel.find({})
            .exec(function (err, doc) {
                if (err) return next(ErrorProvider.getDatabaseError());
                var data = {};
                _.each(doc, function (item) {
                    data[item._id] = item;
                });
                return res.json(data);
            });
    });

    router.get('/:id', function (req, res, next) {
        if (!req.params.id) return next(ErrorProvider.getMissingParametersError());
        UserModel.findOne({ _id: req.params.id })
            .exec(function (err, doc) {
                if (err) return next(ErrorProvider.getDatabaseError());
                var data = {};
                if (doc) data[doc._id] = doc;
                return res.json(data);
            });
    });

    router.post('/', function (req, res, next) {
        if (!req.body.name || !req.body.email || !req.body.password) return next(ErrorProvider.getMissingParametersError());
        UserModel.create(req.body, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());
            return res.json(doc);
        });
    });

    router.put('/:id', function (req, res, next) {
        if (!req.params.id) return next(ErrorProvider.getMissingParametersError());
        UserModel.findOne({_id: req.params.id}, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key))
                    doc[key] = req.body[key];
            }
            doc.modifiedAt = new Date();
            doc.save(function (saveErr, saveDoc) {
                if (saveErr) return next(ErrorProvider.getDatabaseError());
                return res.json(saveDoc);
            });
        });
    });

    router.delete('/:id', function (req, res, next) {
        if (!req.params.id) return next(ErrorProvider.getMissingParametersError());
        UserModel.findByIdAndRemove(req.params.id, function (err, doc) {
            if (err) return next(ErrorProvider.getDatabaseError());
            return res.json(doc);
        });
    });

    return router;

};
/*
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
 */

/*
 publicInterface.login = function (data, callback) {
 if (!data || !data.email || !data.password) return callback(ErrorProvider.getMissingParametersError());
 var standarizedEmail = data.email.trim().toLowerCase();
 User.findOne({ email: standarizedEmail, thirdPartyRegistration: false }, function (err, doc) {
 if (err) return callback(ErrorProvider.getDatabaseError());
 bcrypt.compare(data.password, doc.password, function (err, isMatch) {
 if (err) return callback(ErrorProvider.getSaltError());
 if (!isMatch) return callback(ErrorProvider.getLoginError());
 var dataForToken = { _id: doc._id, email: doc.email, rank: doc.rank };
 return callback(false, { token: jwt.sign(dataForToken, ConfigurationProvider.jwtSecret, { expiresInMinutes: 60 * 5 }) });
 });
 });
 };

 publicInterface.createUser = function (data, callback) {
 if (!data || !data.name || !data.email || !data.password) return callback(ErrorProvider.getMissingParametersError());
 var standarizedEmail = data.email.trim().toLowerCase();

 var gravatarMD5 = crypto.createHash('md5').update(standarizedEmail).digest('hex');
 var gravatarURL = 'https://www.gravatar.com/avatar/' + gravatarMD5;

 bcrypt.genSalt(function (err, salt) {
 if (err) return callback(ErrorProvider.getSaltError());
 bcrypt.hash(data.password, salt, function (err, encryptedPassword) {
 if (err) return callback(ErrorProvider.getSaltError());
 User.create({ name: data.name, email: standarizedEmail, password: encryptedPassword, photo: gravatarURL }, function (err, doc) {
 //TODO: iniciar proceso de confirmación de creación por correo!!!
 if (err) return callback(ErrorProvider.getDatabaseError());
 var dataForToken = { _id: doc._id, email: doc.email, rank: doc.rank };
 return callback(false, { token: jwt.sign(dataForToken, ConfigurationProvider.jwtSecret, { expiresInMinutes: 60 * 5 }) });
 });
 });
 });
 };

 publicInterface.googleSignIn = function (data, callback) {
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
 };

 publicInterface.updateProfile = function (data, callback) {
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
 };

 publicInterface.updatePassword = function (data, callback) {
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
 };

 publicInterface.removeUser = function (data, callback) {
 User.findByIdAndRemove(data._id, function (err, doc) {
 if (err) return callback(ErrorProvider.getDatabaseError());
 return callback(false, doc);
 });
 };

 */