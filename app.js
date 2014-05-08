"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gdg-db');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', initApp);

var express = require('express');
var ioModule = require('socket.io');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var cors = require('cors');

var httpRedirectMiddleware = require('./middlewares/httpRedirect');
var isAuthenticatedMiddleware = require('./middlewares/isAuthenticated');
var notFoundMiddleware = require('./middlewares/notFoundHandler');
var genericErrorHandlerMiddleware = require('./middlewares/genericErrorHandler');

var GlobalAttributesProvider = require('./providers/GlobalAttributesProvider');
var ConfigurationProvider = require('./providers/ConfigurationProvider');

//TODO: Google API library beta 4 nodejs https://github.com/google/google-api-nodejs-client/

function initApp() {

    var app = express();
    //app.use('/', httpRedirectMiddleware);
    app.use('/', bodyParser());
    app.use('/', cors({ origin: true }));
    app.use('/', express.static('assets'));

    //TODO: Revisar que no haya Injection por la no validacion de que los atributos que llegan sean en realidad objetos
    //TODO: Decidir si Router o Controller tienen a cargo la validación de atributos extra en peticion realizada
    //TODO: Decidir ubicación de validación de tokens (Receptor, Receptor + Controller, Controller)

    var publicContributorRouter = require('./routes/contributorRouter');
    var publicPostRouter = require('./routes/postRouter');
    var publicEventRouter = require('./routes/eventRouter');
    var publicAuthRouter = require('./routes/authRouter');
    //var publicUserRouter = require('./routes/userRouter');

    app.use('/contributors', publicContributorRouter);
    app.use('/posts', publicPostRouter);
    app.use('/events', publicEventRouter);
    app.use('/auth', publicAuthRouter);

    //TODO: Actualizar controladores privados para que pasen los errores al errorHandler en vez de resolverlos

    var privateUserRouter = require('./routes/private/userRouter');
    var privatePostRouter = require('./routes/private/postRouter');
    var privateEventRouter = require('./routes/private/eventRouter');
    var privateTemplateRouter = require('./routes/private/templateRouter');

    //app.use('/api', isAuthenticatedMiddleware);
    app.use('/api/users', privateUserRouter);
    app.use('/api/posts', privatePostRouter);
    app.use('/api/events', privateEventRouter);
    app.use('/api/templates', privateTemplateRouter);


    app.use('/', notFoundMiddleware);
    app.use('/', genericErrorHandlerMiddleware);

    http.createServer(app).listen(80);
    var server = https.createServer(ConfigurationProvider.sslCredentials, app).listen(443, function () {
        console.log("HTTPS Server init")
    });

    var io = GlobalAttributesProvider.io = ioModule.listen(server, { log: false });

    io.sockets.on('connection', function (socket) {
        var contributorSocket = require('./sockets/contributorSocket');
        var eventSocket = require('./sockets/eventSocket');
        var postSocket = require('./sockets/postSocket');

        socket.on('/contributors/findAll', contributorSocket.findAll);
        socket.on('/contributors/findById', contributorSocket.findById);
        socket.on('/events/findByPage', eventSocket.findByPage);
        socket.on('/events/findById', eventSocket.findById);
        socket.on('/posts/findByPage', postSocket.findByPage);
        socket.on('/posts/findById', postSocket.findById);
        socket.on('/posts/comment', postSocket.comment);
    });

}