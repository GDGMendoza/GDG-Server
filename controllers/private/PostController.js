"use strict";

var Post = require('./../../models/Post');
var ErrorProvider = require('./../../providers/ErrorProvider');

var privateInterface = {
    findAllPosts: function (data, callback) {
        Post.find({}, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    },
    findPostById: function (data, callback) {
        if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
        Post.findOne({_id: data._id}, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    },
    createPost: function (data, callback) {
        //TODO: notificar en redes sociales!!!
        //TODO: el id de autor debería recibirse como parametro y leerse de req.user
        if (!data || !data.title || !data.author || !data.content) return callback(ErrorProvider.getMissingParametersError());
        Post.create(data, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    },
    updatePostById: function (data, callback) {
        if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
        Post.findOne({_id: data._id}, function (findErr, findDoc) {
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
    },
    removePostById: function (data, callback) {
        if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
        Post.findByIdAndRemove(data._id, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    }
};
module.exports = privateInterface;