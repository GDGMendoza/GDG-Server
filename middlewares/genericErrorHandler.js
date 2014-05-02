"use strict";

module.exports = function (err, req, res, next) {
    // NO TOCAR PARAMETRO NEXT, ES OBLIGATORIO!!!
    if(!err.status) err.status = 500;
    if(!err.message) err.message = 'Algo explotó';
    res.json(err.status, { status: err.status, message: err.message });
};