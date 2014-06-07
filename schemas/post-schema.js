"use strict";

var Schema = require('mongoose').Schema;

var PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    uniqueTitle: { type: String, required: true, index: { unique: true } },
    cover: { type: String }, //Buffer
    tags: [ { type: Schema.Types.ObjectId, ref: 'Tag', required: true, index: true } ],
    content: { type: String, required: true },

    active: { type: Boolean, default: false },
    //releaseDate: { type: Date },

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = PostSchema;