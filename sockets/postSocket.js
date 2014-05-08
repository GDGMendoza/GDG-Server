"use strict";

var jwt = require('jsonwebtoken');
var ConfigurationProvider = require('./../providers/ConfigurationProvider');

var PostController = require('./../controllers/PostController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {

    findById: function (id, callback) {
        PostController.findPostById({ id: id }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion findById del socket " + socket.id);
    },

    findByPage: function (page, callback) {
        PostController.findPostsByPage({ page: page }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion findByPage del socket " + socket.id);
    },

    comment: function (data, callback) {
        jwt.verify(data.token, ConfigurationProvider.jwtSecret, function (err, decoded) {
            if (!err) {
                PostController.comment({ id: data.id, author: decoded._id, content: data.content }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
            } else callback({ status: 500, error: 'Ocurrió un error al realizar la consulta' });
        });
    }

};

module.exports = socketRouter;