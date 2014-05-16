"use strict";

var Post = require('./../models/Post');
var ErrorProvider = require('./../providers/ErrorProvider');
var _ = require('lodash-node');

var publicInterface = {};

publicInterface.findPostsByPage = function (data, callback) {
    var skip = data.page ? 10 * (data.page - 1) : 0;
    Post.find({ active: true })
        .select('author title uniqueTitle cover tags content createdAt modifiedAt')
        .populate('tags', 'name')
        .limit(10).skip(skip)
        .exec(function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            var data = {};
            _.each(doc, function (item) {
                data[item.uniqueTitle] = item;
            });
            return callback(false, data);
        });
};

publicInterface.findPostByUniqueTitle = function (data, callback) {
    if (!data || !data.uniqueTitle) return callback(ErrorProvider.getMissingParametersError());
    Post.findOne({ uniqueTitle: data.uniqueTitle, active: true })
        .select('author title uniqueTitle cover tags content createdAt modifiedAt')
        .populate('tags', 'name')
        .exec(function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            var data = {};
            if(doc) data[doc.uniqueTitle] = doc;
            return callback(false, data);
        });
};

module.exports = publicInterface;