"use strict";

var Schema = require('mongoose').Schema;

var TemplateSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [ { type: Schema.Types.ObjectId, ref: 'Tag', required: true, index: true } ],

    githubLinks: [ String ],
    videoLinks: [ String ],
    demoLink: [ String ],

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = TemplateSchema;