"use strict";

var Post = require('./../models/Post');
var ErrorProvider = require('./../providers/ErrorProvider');
var GlobalAttributesProvider = require('./../providers/GlobalAttributesProvider');

var publicInterface = {
    findPostsByPage: function (data, callback) {
        var skip = data.page ? 10 * (data.page - 1) : 0;
        Post.find({ active: true },
            'title author content cover tags comments createdAt modifiedAt',
            { limit: 10, skip: skip },
            function (err, doc) {
                //TODO: Popular parcialmente usuarios existentes en comentarios
                if(!err) return callback(false, doc);
                else return callback(ErrorProvider.getDatabaseError());
            }
        );
    },
    findPostById: function (data, callback) {
        if (data.id) {
            Post.findOne({ _id: data.id, active: true },
                'title author content cover tags comments createdAt modifiedAt',
                function (err, doc) {
                    //TODO: Popular parcialmente usuarios existentes en comentarios
                    if(!err) return callback(false, doc);
                    else return callback(ErrorProvider.getDatabaseError());
                }
            );
        } else return callback(ErrorProvider.getMissingParametersError());
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
                                GlobalAttributesProvider.io.sockets.emit('new comment', {id: data.id, author: data.author, content: data.content});
                                return callback(false, doc);
                            } else return callback(ErrorProvider.getDatabaseError());
                        });
                    } else return callback(ErrorProvider.getDatabaseError());
                }
            );
        } else return callback(ErrorProvider.getMissingParametersError());
    }
};

module.exports = publicInterface;