"use strict";

var Post = require('./../models/Post');
var globals = require('./../global');

module.exports = {
    public: {
        findPostsByPage: function (data, callback) {
            var skip = data.page ? 10 * (data.page - 1) : 0;
            Post.find({ active: true },
                'title author content cover tags comments createdAt modifiedAt',
                { limit: 10, skip: skip },
                function (err, doc) {
                    //TODO: Popular parcialmente usuarios existentes en comentarios
                    return callback(err, doc);
                }
            );
        },
        findPostById: function (data, callback) {
            if (data.id) {
                Post.findOne({ _id: data.id, active: true },
                    'title author content cover tags comments createdAt modifiedAt',
                    function (err, doc) {
                        //TODO: Popular parcialmente usuarios existentes en comentarios
                        return callback(err, doc);
                    }
                );
            } else return callback(true);
        },
        comment: function (data, callback) {
            if (data.id && data.author && data.content) {
                Post.findOne({ _id: data.id, active: true },
                    'title author content cover tags comments createdAt modifiedAt',
                    function (err, doc) {
                        if (!err) {
                            doc.comments.push({ author: data.author, content: data.content });
                            doc.save(function (err, doc) {
                                if(!err){
                                    //TODO: Verificar que funcione y optimizar para no floodear a clientes
                                    globals.io.sockets.emit('new comment', {id: data.id, author: data.author, content: data.content});
                                }
                                return callback(!err);
                            });
                        } else return callback(true);
                    }
                );
            } else return callback(true);
        }
    },
    private: {
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
    }
};