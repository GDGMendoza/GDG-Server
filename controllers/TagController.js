"use strict";

var Tag = require('./../models/Tag');
var ErrorProvider = require('./../providers/ErrorProvider');

var publicInterface = {};

publicInterface.reverseGlobalSubscription = function (data, callback) {
    /*
    User.findOne({_id: data._id}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        doc.globalSubscription = !doc.globalSubscription;
        doc.save(function (saveErr, saveDoc) {
            if (saveErr) return callback(ErrorProvider.getDatabaseError());
            return callback(false, saveDoc);
        });
    })
    */
};

publicInterface.reverseTagSubscription = function (data, callback) {

    Tag.findOne({name: data.name}, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());

        var standarizedEmail = data.email.trim().toLowerCase();
        var found = false;
        for (var i = 0; i < doc.userSubscriptionList.length; i++) { //revisar
            if (doc.userSubscriptionList[i] == standarizedEmail) {
                doc.userSubscriptionList.splice(i, 0);
                found = true;
                break;
            }
        }
        if (!found) doc.userSubscriptionList.push(standarizedEmail);

        doc.save(function (saveErr, saveDoc) {
            if (saveErr) return callback(ErrorProvider.getDatabaseError());
            return callback(false, saveDoc);
        });
    })
};

module.exports = publicInterface;