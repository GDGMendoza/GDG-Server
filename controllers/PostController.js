"use strict";

var Post = require('./../models/Post');
var ErrorProvider = require('./../providers/ErrorProvider');
var GlobalAttributesProvider = require('./../providers/GlobalAttributesProvider');

var publicInterface = {
    findPostsByPage: function (data, callback) {
        var skip = data.page ? 10 * (data.page - 1) : 0;
        Post.find({ active: true },
            'author title dashedTitle cover tags content comments createdAt modifiedAt',
            { limit: 10, skip: skip },
            function (err, doc) {
                //TODO: Popular parcialmente usuarios existentes en comentarios
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            }
        );
    },
    findPostById: function (data, callback) {
        if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
        Post.findOne({ _id: data._id, active: true },
            'author title dashedTitle cover tags content comments createdAt modifiedAt',
            function (err, doc) {
                //TODO: Popular parcialmente usuarios existentes en comentarios
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            }
        );
    },
    comment: function (data, callback) {
        if (!data || !data._id || !data.author || !data.content) return callback(ErrorProvider.getMissingParametersError());
        Post.findOne({ _id: data._id, active: true },
            'author title dashedTitle cover tags content comments createdAt modifiedAt',
            function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                doc.comments.push({ author: data.author, content: data.content });
                doc.save(function (err, doc) {
                    // TODO: Verificar que no se estén eliminando los atributos no traidos de la BD
                    // TODO: Verificar que funcione y optimizar para no floodear a clientes
                    if (err) return callback(ErrorProvider.getDatabaseError());
                    GlobalAttributesProvider.io.sockets.emit('new comment', {id: data.id, author: data.author, content: data.content});
                    return callback(false, doc);
                });
            }
        );
    }
};

module.exports = publicInterface;