"use strict";

var Post = require('./../models/Post');
var ErrorProvider = require('./../providers/ErrorProvider');

var publicInterface = {};

publicInterface.findPostsByPage = function (data, callback) {
    var skip = data.page ? 10 * (data.page - 1) : 0;
    Post.find({ active: true },
        '_id author title dashedTitle cover tags content createdAt modifiedAt',
        { limit: 10, skip: skip },
        function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        }
    );
};

publicInterface.findPostById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    Post.findOne({ _id: data._id, active: true },
        '_id author title dashedTitle cover tags content comments createdAt modifiedAt',
        function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        }
    );
};

module.exports = publicInterface;