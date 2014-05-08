"use strict";

var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    name: { type: String, required: true, index: { unique: true } },
    userSubscriptionList: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true } ],

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tag', tagSchema, 'tags');