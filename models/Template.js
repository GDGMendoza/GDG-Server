"use strict";

var mongoose = require('mongoose');

var templateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true, index: true } ],

    githubLinks: [ String ],
    videoLinks: [ String ],
    demoLink: [ String ],

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Template', templateSchema, 'templates');