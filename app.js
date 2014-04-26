"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gdg-db');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', initApp);

var express = require('express');
var ioModule = require('socket.io');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressJwt = require('express-jwt');
//var config = require('./local');

function initApp() {

    var app = express();
    var io = ioModule.listen(app, { log: true });

    app.use('/', bodyParser());
    app.use('/', cors());

    app.use('/contributors', require('./routes/contributorRouter'));
    app.use('/posts', require('./routes/postRouter'));
    app.use('/events', require('./routes/eventRouter'));
    app.use('/auth', require('./routes/authRouter'));

    app.use('/api', expressJwt({ secret: config.secret }));
    app.use('/api/users', require('./routes/private/userRouter'));
    app.use('/api/posts', require('./routes/private/postRouter'));
    app.use('/api/events', require('./routes/private/eventRouter'));
    app.use('/api/templates', require('./routes/private/templateRouter'));


    app.use('/', function (req, res) {
        //TODO: Convertir en middleware de error handler genérico
        res.json(404, { error: 'Recurso solicitado inexistente' });
    });

    app.listen(3000);

}