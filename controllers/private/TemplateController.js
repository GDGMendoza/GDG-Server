"use strict";

var Template = require('./../../models/Template');
var ErrorProvider = require('./../../providers/ErrorProvider');

var privateInterface = {};

privateInterface.findAllTemplates = function (data, callback) {
    Template.find({}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

privateInterface.findTemplateById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    Template.findOne({_id: data._id}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

privateInterface.createTemplate = function (data, callback) {
    if (!data || !data.title || !data.description) return callback(ErrorProvider.getMissingParametersError());
    Template.create(data, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

privateInterface.updateTemplateById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    Template.findOne({_id: data._id}, function (findErr, findDoc) {
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
};

privateInterface.removeTemplateById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    Template.findByIdAndRemove(data._id, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

module.exports = privateInterface;