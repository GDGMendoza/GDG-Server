"use strict";

var Event = require('./../models/Event');
var ErrorProvider = require('./../providers/ErrorProvider');

var publicInterface = {
    findEventsByPage: function (data, callback) {
        var skip = data.page ? 10 * (data.page - 1) : 0;
        Event.find({ active: true },
            'cover title description date difficulty location googlePlusEvent facebookEvent googlePlusAlbum sessions liveStream createdAt modifiedAt',
            { limit: 10, skip: skip },
            function (err, doc) {
                if(!err) return callback(false, doc);
                else return callback(ErrorProvider.getDatabaseError());
            }
        );
    },
    findEventById: function (data, callback) {
        if (data.id) {
            Event.findOne({ _id: data.id, active: true },
                'cover title description date difficulty location googlePlusEvent facebookEvent googlePlusAlbum sessions liveStream createdAt modifiedAt',
                function (err, doc) {
                    if(!err) return callback(false, doc);
                    else return callback(ErrorProvider.getDatabaseError());
                }
            );
        } else return callback(ErrorProvider.getMissingParametersError());
    }
};

module.exports = publicInterface;