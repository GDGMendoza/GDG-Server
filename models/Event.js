"use strict";

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    dashedTitle: { type: String, required: true, index: { unique: true } },
    cover: { type: String }, //Buffer
    description: { type: String },
    difficulty: { type: String },
    eventDate: { type: Date, required: true },
    location: {
        googleMapImage: { type: String },
        googleMapLink: { type: String },
        address: { type: String }
    },

    sessions: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true, index: true } ],

    googlePlusAlbum: { type: String },

    active: { type: Boolean, default: false },

    //agenda: { }, //probablemente sea un atributo virtual
    //tags: [ String ], //seteado automaticamente segun sesiones
    //liveStream: { type: String },
    //gdg: { type: String, default: "GDGMendoza" },
    //releaseDate: { type: Date },

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema, 'events');