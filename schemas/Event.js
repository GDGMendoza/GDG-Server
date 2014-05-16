"use strict";

var Schema = require('mongoose').Schema;
var SessionSchema = require('./Session');

var EventSchema = new Schema({
    title: { type: String, required: true },
    uniqueTitle: { type: String, required: true, index: { unique: true } },
    cover: { type: String }, //Buffer
    description: { type: String },
    difficulty: { type: String },
    eventDate: { type: String, required: true },
    location: {
        x: { type: Number },
        y: { type: Number }
    },

    sessions: [ SessionSchema ], //{ type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true, index: true }

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

module.exports = EventSchema;