"use strict";

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: { type: String, required: true, index: { unique: true } },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, required: true },
    cover: { type: String }, //Buffer
    tags: [ String ],
    comments: [
        {
            author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            modifiedAt: { type: Date, default: Date.now }
        }
    ],
    active: {}, //WILDCARD!! notificar OBLIGATORIAMENTE al guardar //Date en caso de releaseDate
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema, 'posts');