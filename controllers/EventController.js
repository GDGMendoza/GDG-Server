"use strict";

var Event = require('./../models/Event');
var ErrorProvider = require('./../providers/ErrorProvider');

var publicInterface = {
    findEventsByPage: function (data, callback) {
        var skip = data.page ? 10 * (data.page - 1) : 0;
        Event.find({ active: true },
            'cover title dashedTitle description eventDate difficulty location googlePlusAlbum sessions createdAt modifiedAt',
            { limit: 10, skip: skip },
            function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            }
        );
    },
    findEventById: function (data, callback) {
        if (!data || !data._id) return callback(ErrorProvider.getMissingParametersError());
        Event.findOne({ _id: data._id, active: true },
            'cover title dashedTitle description eventDate difficulty location googlePlusAlbum sessions createdAt modifiedAt',
            function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            }
        );
    }
};

module.exports = publicInterface;