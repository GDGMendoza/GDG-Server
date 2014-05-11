"use strict";

var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true, index: true } ],
    speakers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true } ],

    startTime: { type: String },
    endTime: { type: String },

    githubLinks: [ String ],
    videoLinks: [ String ],
    demoLink: [ String ],

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

var eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dashedTitle: { type: String, required: true, index: { unique: true } },
    cover: { type: String }, //Buffer
    description: { type: String },
    difficulty: { type: String },
    eventDate: { type: String, required: true },
    location: {
        x: { type: Number },
        y: { type: Number }
    },

    sessions: [ sessionSchema ], //{ type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true, index: true }

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