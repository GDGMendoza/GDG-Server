"use strict";

var Schema = require('mongoose').Schema;

var SessionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [ { type: Schema.Types.ObjectId, ref: 'Tag', required: true, index: true } ],
    speakers: [ { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true } ],

    startTime: { type: String },
    endTime: { type: String },

    githubLinks: [ String ],
    videoLinks: [ String ],
    demoLink: [ String ],

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = SessionSchema;