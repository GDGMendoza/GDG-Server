"use strict";

var jwt = require('jsonwebtoken');
var ConfigurationProvider = require('./../providers/ConfigurationProvider')
var ErrorProvider = require('./../providers/ErrorProvider');

module.exports = function (req, res, next) {
    if (!req.headers || !req.headers.authorization) return next(ErrorProvider.getWrongAuthParametersError());
    var parts = req.headers.authorization.split(' ');
    if (parts.length != 2) return next(ErrorProvider.getWrongAuthFormatError());
    if (parts[0] != 'Bearer') return next(ErrorProvider.getNotAuthBearerError());

    jwt.verify(parts[1], ConfigurationProvider.jwtSecret, function (err, decoded) {
        if (err) return next(ErrorProvider.getTokenError());
        req.user = decoded;
        return next();
    });
};