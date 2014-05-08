"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    rank: { type: String, required: true, default: "member" },
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String },

    title: { type: String },
    company: { type: String },
    googlePlus: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    photo: { type: String },
    //gdg: { type: String, default: "GDGMendoza" },
    //googleMap: { type: String },

    globalSubscription: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema, 'users');