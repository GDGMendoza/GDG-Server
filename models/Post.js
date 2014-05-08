"use strict";

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    dashedTitle: { type: String, required: true, index: { unique: true } },
    cover: { type: String }, //Buffer
    tags: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true, index: true } ],
    content: { type: String, required: true },

    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true } ],

    active: { type: Boolean, default: false },

    //releaseDate: { type: Date },

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema, 'posts');