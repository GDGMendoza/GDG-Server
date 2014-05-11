"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },

    title: { type: String },
    company: { type: String },
    googlePlus: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    photo: { type: String },
    //gdg: { type: String, default: "GDGMendoza" },
    //googleMap: { type: String },

    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema, 'users');