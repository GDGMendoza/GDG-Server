"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name: { type: String, required: true },
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

// Bcrypt middleware on UserSchema
userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//Password verification
userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

module.exports = mongoose.model('User', userSchema, 'users');