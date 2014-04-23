"use strict";

var Event = require('./../models/Event');

module.exports = {
    public: {
        findEventsByPage: function (page, data, callback) {
            Event.find({ active: true },
                'cover title description date difficulty location googlePlusEvent facebookEvent googlePlusAlbum sessions liveStream createdAt modifiedAt',
                { limit: 10, skip: page ? 10 * (page - 1) : 0 },
                function (err, doc) {
                    callback(err, doc);
                }
            );
        },
        findEventById: function (id, data, callback) {
            Event.findById(id,
                'cover title description date difficulty location googlePlusEvent facebookEvent googlePlusAlbum sessions liveStream createdAt modifiedAt',
                function (err, doc) {
                    callback(err, doc);
                }
            );
        }
    },
    private: {

    }
};