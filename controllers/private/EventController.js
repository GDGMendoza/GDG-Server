"use strict";

var Event = require('./.././Event');
var ErrorProvider = require('./../../providers/ErrorProvider');

//TODO: publicar evento && notificar por correo a suscriptores

var privateInterface = {};

privateInterface.findAllEvents = function (data, callback) {
    Event.find({}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

privateInterface.findEventById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    Event.findOne({_id: data._id}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

privateInterface.createEvent = function (data, callback) {
    //TODO: notificar en redes sociales!!!
    if (!data || !data.title || !data.uniqueTitle || !data.eventDate ) return callback(ErrorProvider.getMissingParametersError());
    //delete data.sessions; // Esto va a ser manejado por separado
    Event.create(data, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

privateInterface.updateEventById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    delete data.sessions; // Esto va a ser manejado por separado
    Event.findOne({_id: data._id}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        for (var key in data) {
            if (data.hasOwnProperty(key))
                doc[key] = data[key];
        }
        doc.modifiedAt = new Date();
        doc.save(function (saveErr, saveDoc) {
            if (saveErr) return callback(ErrorProvider.getDatabaseError());
            return callback(false, saveDoc);
        });
    });
};

privateInterface.removeEventById = function (data, callback) {
    if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
    Event.findByIdAndRemove(data._id, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        return callback(false, doc);
    });
};

module.exports = privateInterface;