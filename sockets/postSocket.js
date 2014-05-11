"use strict";

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

module.exports = socketRouter;