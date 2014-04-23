
var express = require('express');
var router = express.Router();

var PostController = require('./../controllers/PostController');

router.get('/', function (req, res) {
    PostController.findPostsByPage(req.query.page, req.body, function(err, doc){
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

router.get('/:id', function (req, res) {
    PostController.findPostById(req.params.id, req.body, function (err, doc) {
        if (!err) res.json(doc);
        else res.json(500, {error: 'Ocurrió un error al realizar la consulta'});
    });
});

module.exports = router;