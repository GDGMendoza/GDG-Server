var Post = require('./../models/Post');

module.exports = {

    findPostsByPage: function (page, data, callback) {
        Post.find({ active: true },
            'title author content cover tags createdAt modifiedAt',
            { limit: 10, skip: page ? 10 * (page - 1) : 0 },
            function (err, doc) {
                callback(err, doc);
            }
        );
    },
    findPostById: function (id, data, callback) {
        Post.findById(id,
            'title author content cover tags createdAt modifiedAt',
            function (err, doc) {
                callback(err, doc);
            }
        );
    }

};