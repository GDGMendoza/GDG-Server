"use strict";

var PostController = require('./../controllers/PostController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {};

socketRouter.findByUniqueTitle = function (data, callback) {
    PostController.findPostByUniqueTitle({ uniqueTitle: data.uniqueTitle }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion findById del socket " + socket.id);
};

socketRouter.findByPage = function (data, callback) {
    PostController.findPostsByPage({ page: data.page }, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log(">>> Peticion findByPage del socket " + socket.id);
};

module.exports = socketRouter;