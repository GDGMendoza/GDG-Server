"use strict";

module.exports = function(EventModel){

    var ErrorProvider = require('./../providers/ErrorProvider');
    var _ = require('lodash-node');

    var publicInterface = {};

    publicInterface.findEventsByPage = function (data, callback) {
        var skip = data.page ? 10 * (data.page - 1) : 0;
        EventModel.find({ active: true })
            .select('cover title uniqueTitle description eventDate difficulty location googlePlusAlbum sessions createdAt modifiedAt')
            .populate('tags', 'name')
            .limit(10).skip(skip)
            .exec(function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                var data = {};
                _.each(doc, function (item) {
                    data[item.uniqueTitle] = item;
                });
                return callback(false, data);
            });
    };

    publicInterface.findEventByUniqueTitle = function (data, callback) {
        if (!data || !data.uniqueTitle) return callback(ErrorProvider.getMissingParametersError());
        EventModel.findOne({ uniqueTitle: data.uniqueTitle, active: true })
            .select('cover title uniqueTitle description eventDate difficulty location googlePlusAlbum sessions createdAt modifiedAt')
            .populate('tags', 'name')
            .exec(function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                var data = {};
                if(doc) data[doc.uniqueTitle] = doc;
                return callback(false, data);
            });
    };

    return publicInterface;

};