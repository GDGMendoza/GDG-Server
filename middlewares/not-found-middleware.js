"use strict";

var ErrorProvider = require('./../providers/error-provider');

module.exports = function (req, res, next) {
    next(ErrorProvider.getNotFoundError());
};