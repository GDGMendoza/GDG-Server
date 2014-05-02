"use strict";

var jwt = require('jsonwebtoken');
var config = require('./../local');

var PostController = require('./../controllers/PostController');
var globals = require('./../global');

var socketRouter = {

    findById: function (id, callback) {
        PostController.public.findPostById({ id: id }, globals.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion findById del socket " + socket.id);
    },

    findByPage: function (page, callback) {
        PostController.public.findPostsByPage({ page: page }, globals.defaultSocketResponseHandler(callback));
        console.log(">>> Peticion findByPage del socket " + socket.id);
    },

    comment: function (data, callback) {
        jwt.verify(data.token, config.jwtSecret, function(err, decoded) {
            if (!err){
                PostController.public.comment({ id: data.id, author: decoded._id, content: data.content }, globals.defaultSocketResponseHandler(callback));
            } else callback({ status: 500, error: 'Ocurrió un error al realizar la consulta' });
        });
    }

};

module.exports = socketRouter;