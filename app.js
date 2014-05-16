"use strict";

var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost/gdg-db');
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', initApp);

var EventModel = connection.model('Event', require('./schemas/Event'), 'events');
var PostModel = connection.model('Posts', require('./schemas/Post'), 'posts');
var TagModel = connection.model('Tag', require('./schemas/Tag'), 'tags');
var TemplateModel = connection.model('Template', require('./schemas/Template'), 'templates');
var UserModel = connection.model('User', require('./schemas/User'), 'users');

//TODO: Google API library beta 4 nodejs https://github.com/google/google-api-nodejs-client/
//TODO: Uso de Google Groups de announcements para manejo de suscripciones (?)

function initApp() {

    var express = require('express');
    var ioModule = require('socket.io');
    var http = require('http');
    var https = require('https');
    var bodyParser = require('body-parser');
    var cors = require('cors');

    var GlobalAttributesProvider = require('./providers/GlobalAttributesProvider'); //Helper
    var ConfigurationProvider = require('./providers/ConfigurationProvider');

    var app = express();
    //app.use('/', require('./middlewares/httpRedirect'));
    app.use('/', bodyParser());
    app.use('/', cors({ origin: true }));
    app.use('/', express.static('assets'));

    app.use('/contributors', require('./routes/contributorRouter')(UserModel));
    app.use('/posts', require('./routes/postRouter')(PostModel));
    app.use('/events', require('./routes/eventRouter')(EventModel));
    app.use('/tags', require('./routes/tagRouter')(TagModel));

/*
    //app.use('/api', require('./middlewares/isAuthenticated'));
    app.use('/api/users', require('./routes/private/userRouter'));
    app.use('/api/posts', require('./routes/private/postRouter'));
    app.use('/api/events', require('./routes/private/eventRouter'));
    app.use('/api/templates', require('./routes/private/templateRouter'));
    app.use('/api/tags', require('./routes/private/tagRouter'));
*/

    app.use('/', require('./middlewares/notFoundHandler'));
    app.use('/', require('./middlewares/genericErrorHandler'));

    http.createServer(app).listen(80);
    var server = https.createServer(ConfigurationProvider.sslCredentials, app).listen(443, function () {
        console.log("HTTPS Server init")
    });

    var io = GlobalAttributesProvider.io = ioModule.listen(server, { log: false });

    io.sockets.on('connection', function (socket) {
        var contributorSocket = require('./sockets/contributorSocket')(UserModel);
        var eventSocket = require('./sockets/eventSocket')(EventModel);
        var postSocket = require('./sockets/postSocket')(PostModel);

        socket.on('/contributors/findAll', contributorSocket.findAll);
        socket.on('/events/findByPage', eventSocket.findByPage);
        socket.on('/events/findByUniqueTitle', eventSocket.findByUniqueTitle);
        socket.on('/posts/findByPage', postSocket.findByPage);
        socket.on('/posts/findByUniqueTitle', postSocket.findByUniqueTitle);
    });

}