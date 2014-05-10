"use strict";

var Event = require('./../../models/Event');
var ErrorProvider = require('./../../providers/ErrorProvider');

var privateInterface = {
    findAllEvents: function (data, callback) {
        Event.find({}, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        });
    },
    findEventById: function (id, data, callback) {
        if (id) {
            Event.findById(id, function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            });
        } else callback(true);
    },
    createEvent: function (data, callback) {
        //TODO: notificar en redes sociales!!!
        if (data.title && data.date) {
            delete data.sessions; // Esto va a ser manejado por separado
            Event.create(data, function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            });
        } else return callback(true);
    },
    updateEventById: function (id, data, callback) {
        if (id) {
            delete data.sessions; // Esto va a ser manejado por separado
            Event.findById(id, function (findErr, findDoc) {
                if (findErr) return callback(ErrorProvider.getDatabaseError());
                for (var key in data) {
                    if (data.hasOwnProperty(key))
                        findDoc[key] = data[key];
                }
                findDoc.save(function (saveErr, saveDoc) {
                    if (saveErr) return callback(ErrorProvider.getDatabaseError());
                    return callback(false, saveDoc);
                });
            });
        } else callback(true);
    },
    removeEventById: function (id, data, callback) {
        if (id) {
            Event.findByIdAndRemove(id, function (err, doc) {
                if(err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            });
        } else callback(true);
    }

    //TODO: publicar evento && notificar por correo a suscriptores
};

module.exports = privateInterface;