"use strict";

var Post = require('./../../models/Post');
var globals = require('./../../global');

var privateInterface = {
    findAllPosts: function (data, callback) {
        Post.find({}, function (err, doc) {
            callback(err, doc);
        });
    },
    findPostById: function (id, data, callback) {
        if (id) {
            Post.findById(id, function (err, doc) {
                callback(err, doc);
            });
        } else callback(true);
    },
    createPost: function (data, callback) {
        //TODO: notificar en redes sociales!!!
        //TODO: el id de autor debería recibirse como parametro y leerse de req.user
        if (data.title && data.author && data.content) {
            Post.create(data, function (err, doc) {
                callback(err, doc);
            });
        } else return callback(true);
    },
    updatePostById: function (id, data, callback) {
        if (id) {
            Post.findById(id, function (findErr, findDoc) {
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
    removePostById: function (id, data, callback) {
        if (id) {
            Post.findByIdAndRemove(id, function (err, doc) {
                callback(err, doc);
            });
        } else callback(true);
    }
};
module.exports = privateInterface;