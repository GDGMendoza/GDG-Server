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

module.exports = mongoose.model('Session', sessionSchema, 'sessions');