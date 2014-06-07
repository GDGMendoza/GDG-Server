"use strict";

var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost/gdg-db');
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', initApp);

var EventSchema = require('./schemas/event-schema');
var PostSchema = require('./schemas/post-schema');
var TagSchema = require('./schemas/tag-schema');
var TemplateSchema = require('./schemas/template-schema');
var UserSchema = require('./schemas/user-schema');

var EventModel = connection.model('Event', EventSchema, 'events');
var PostModel = connection.model('Posts', PostSchema, 'posts');
var TagModel = connection.model('Tag', TagSchema, 'tags');
var TemplateModel = connection.model('Template', TemplateSchema, 'templates');
var UserModel = connection.model('User', UserSchema, 'users');

//TODO: Google API library beta 4 nodejs https://github.com/google/google-api-nodejs-client/
//TODO: Uso de Google Groups de announcements para manejo de suscripciones (?)

function initApp() {

    var express = require('express');
    var ioModule = require('socket.io');
    var http = require('http');
    var https = require('https');
    var bodyParser = require('body-parser');
    var cors = require('cors');

    var ConfigurationProvider = require('./providers/configuration-provider');

    var HttpRedirectMiddleware = require('./middlewares/http-redirect-middleware');
    var IsAuthenticatedMiddleware = require('./middlewares/is-authenticated-middleware');
    var NotFoundMiddleware = require('./middlewares/not-found-middleware');
    var ErrorHandlerMiddleware = require('./middlewares/error-handler-middleware');

    var app = express();
    app.use('/', HttpRedirectMiddleware);
    app.use('/', bodyParser());
    app.use('/', cors({ origin: true }));
    app.use('/', express.static('assets'));

    var ContributorController = require('./controllers/contributor-controller');
    var PostController = require('./controllers/post-controller');
    var EventController = require('./controllers/event-controller');
    var TagController = require('./controllers/tag-controller');

    app.use('/contributors', ContributorController(UserModel));
    app.use('/posts', PostController(PostModel));
    app.use('/events', EventController(EventModel));
    app.use('/tags', TagController(TagModel));

    http.createServer(app).listen(80);
    var server = https.createServer(ConfigurationProvider.sslCredentials, app).listen(443, function () {
        console.log("HTTPS Server init")
    });
    var io = ioModule.listen(server, { log: false });

    /*
    //app.use('/api', IsAuthenticatedMiddleware);
    app.use('/api/users', require('./routes/private/userRouter'));
    app.use('/api/posts', require('./routes/private/postRouter'));
    app.use('/api/events', require('./routes/private/eventRouter'));
    app.use('/api/templates', require('./routes/private/templateRouter'));
    app.use('/api/tags', require('./routes/private/tagRouter'));
    */

    app.use('/', NotFoundMiddleware);
    app.use('/', ErrorHandlerMiddleware);

}