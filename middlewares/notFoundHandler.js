"use strict";

var ErrorProvider = require('./../providers/ErrorProvider');

module.exports = function (req, res, next) {
    next(ErrorProvider.getNotFoundError());
};