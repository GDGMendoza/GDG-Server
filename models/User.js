"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String },
    title: { type: String },
    company: { type: String },
    googlePlus: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    photo: { type: String }, //Buffer
    rank: { type: String, default: "member" },
    globalFollow: { type: Boolean, default: false },
    googleMap: { type: String },
    //gdg: { type: String, default: "GDGMendoza" },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema, 'users');