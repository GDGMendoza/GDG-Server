"use strict";

var Schema = require('mongoose').Schema;

var TagSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    //userSubscriptionList: [ { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true } ],

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = TagSchema;