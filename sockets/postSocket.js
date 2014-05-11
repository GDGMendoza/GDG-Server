"use strict";

var jwt = require('jsonwebtoken');
var ConfigurationProvider = require('./../providers/ConfigurationProvider');

var PostController = require('./../controllers/PostController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {};

socketRouter.findById = function (data, callback) {
    PostController.findPostById(data, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion findById del socket " + socket.id);
};

socketRouter.findByPage = function (data, callback) {
    PostController.findPostsByPage(data, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion findByPage del socket " + socket.id);
};

socketRouter.comment = function (data, callback) {
    jwt.verify(data.token, ConfigurationProvider.jwtSecret, function (err, decoded) {
        if (err) return callback({ status: 500, error: 'Ocurrió un error al realizar la consulta' });
        var dataBis = data;
        dataBis.author = {_id: decoded._id};
        PostController.comment(dataBis, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    });
};

module.exports = socketRouter;