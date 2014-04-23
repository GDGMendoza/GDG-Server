
var User = require('./../models/User');

module.exports = {

    findAllContributors: function (data, callback) {
        User.find({ rank: 'contributor' },
            'name title company googlePlus facebook twitter photo googleMap',
            function (err, doc) {
                callback(err, doc);
            }
        );
    },
    findUserById: function (id, data, callback) {
        User.findById(id,
            'name title company googlePlus facebook twitter photo googleMap',
            function (err, doc) {
                callback(err, doc);
            }
        );
    }

};