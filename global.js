"use strict";

module.exports = {

    io: {},

    defaultHttpResponseHandler: function (res) {
        return function(err, doc){
            if (!err) res.json(doc);
            else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
        };
    },

    defaultSocketResponseHandler: function(callback) {
        return function (err, doc) {
            if (!err) callback(doc);
            else callback({ code: 500, error: 'Ocurrió un error al realizar la consulta' });
        };
    }

};