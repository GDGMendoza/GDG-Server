"use strict";

var Template = require('./../models/Template');

module.exports = {
    private: {
        findAllTemplates: function (data, callback) {
            Template.find({}, function (err, doc) {
                callback(err, doc);
            });
        },
        findTemplateById: function (id, data, callback) {
            if (id) {
                Template.findById(id, function (err, doc) {
                    callback(err, doc);
                });
            } else callback(true);
        },
        createTemplate: function (data, callback) {
            if (data.title && data.description) {
                Template.create(data, function (err, doc) {
                    callback(err, doc);
                });
            } else return callback(true);
        },
        updateTemplateById: function (id, data, callback) {
            if (id) {
                Template.findById(id, function (findErr, findDoc) {
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
        removeTemplateById: function (id, data, callback) {
            if (id) {
                Template.findByIdAndRemove(id, function (err, doc) {
                    callback(err, doc);
                });
            } else callback(true);
        }
    }
};