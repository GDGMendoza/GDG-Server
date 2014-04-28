"use strict";

var Event = require('./../models/Event');

module.exports = {
    public: {
        findEventsByPage: function (data, callback) {
            var skip = data.page ? 10 * (data.page - 1) : 0;
            Event.find({ active: true },
                'cover title description date difficulty location googlePlusEvent facebookEvent googlePlusAlbum sessions liveStream createdAt modifiedAt',
                { limit: 10, skip: skip },
                function (err, doc) {
                    return callback(err, doc);
                }
            );
        },
        findEventById: function (data, callback) {
            if (data.id) {
                Event.findOne({ _id: data.id, active: true },
                    'cover title description date difficulty location googlePlusEvent facebookEvent googlePlusAlbum sessions liveStream createdAt modifiedAt',
                    function (err, doc) {
                        return callback(err, doc);
                    }
                );
            } else return callback(true);
        }
    },
    private: {
        findAllEvents: function (data, callback) {
            Event.find({}, function (err, doc) {
                callback(err, doc);
            });
        },
        findEventById: function (id, data, callback) {
            if (id) {
                Event.findById(id, function (err, doc) {
                    callback(err, doc);
                });
            } else callback(true);
        },
        createEvent: function (data, callback) {
            //TODO: notificar en redes sociales!!!
            if (data.title && data.date) {
                delete data.sessions; // Esto va a ser manejado por separado
                Event.create(data, function (err, doc) {
                    callback(err, doc);
                });
            } else return callback(true);
        },
        updateEventById: function (id, data, callback) {
            if (id) {
                delete data.sessions; // Esto va a ser manejado por separado
                Event.findById(id, function (findErr, findDoc) {
                    if (!findErr) {
                        for (var key in data) {
                            if (data.hasOwnProperty(key))
                                findDoc[key] = data[key];
                        }
                        findDoc.save(function (saveErr, saveDoc) {
                            callback(saveErr, saveDoc);
                        });
                    } else callback(true);
                });
            } else callback(true);
        },
        removeEventById: function (id, data, callback) {
            if (id) {
                Event.findByIdAndRemove(id, function (err, doc) {
                    callback(err, doc);
                });
            } else callback(true);
        }

        //TODO: publicar evento && notificar por correo a suscriptores
    }
};