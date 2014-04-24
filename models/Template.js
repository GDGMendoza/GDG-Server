"use strict";

var mongoose = require('mongoose');

var templateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [ String ],
    githubLinks: [ String ],
    videoLinks: [ String ],
    demoLink: { type: String },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Template', templateSchema, 'templates');