"use strict";

var Tag = require('./../../models/Tag');
var ErrorProvider = require('./../../providers/ErrorProvider');

var privateInterface = {};

privateInterface.findAllTags = function (data, callback) {
    Tag.find({}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

privateInterface.findTagById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    Tag.findOne({_id: data._id}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

privateInterface.createTag = function (data, callback) {
    if (!data || !data.name ) return callback(ErrorProvider.getMissingParametersError());
    Tag.create(data, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

privateInterface.updateTagById = function (data, callback) {
    if (!data || !data._id || !data.name) return callback(ErrorProvider.getMissingParametersError());
    Tag.findOne({_id: data._id}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        doc.name = data.name;
        doc.modifiedAt = new Date();
        doc.save(function (saveErr, saveDoc) {
            if (saveErr) return callback(ErrorProvider.getDatabaseError());
            return callback(false, saveDoc);
        });
    });
};

privateInterface.removeTagById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    Tag.findByIdAndRemove(data._id, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

module.exports = privateInterface;