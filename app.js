"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gdg-db');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', initApp);

var express = require('express');
var fs = require('fs');
var ioModule = require('socket.io');
var bodyParser = require('body-parser');
var cors = require('cors');
//var expressJwt = require('express-jwt');
//var socketsJwt = require('socketio-jwt');


//TODO: Envolver en bloques try/catch principalmente a los metodos modificadores de datos de los controladores
// debido a que si intentamos por ejemplo hacer un push de un atributo de tipo arreglo y ese atributo no existe
// el servidor automáticamente se cae por no tener captura de error establecida

function initApp() {

    var app = express();
    //app.use('/', require('./middlewares/httpRedirect'));
    app.use('/', bodyParser());
    app.use('/', cors());
    app.use('/', express.static('assets'));

    //app.enable('trust proxy');
    app.use('/contributors', require('./routes/contributorRouter'));
    app.use('/posts', require('./routes/postRouter'));
    app.use('/events', require('./routes/eventRouter'));
    app.use('/auth', require('./routes/authRouter'));

    //TODO: Reemplazar expressJwt por middleware custom que realice la validación básica equivalente
    //app.use('/api', expressJwt({ secret: config.jwtSecret }));
    app.use('/api/users', require('./routes/private/userRouter'));
    app.use('/api/posts', require('./routes/private/postRouter'));
    app.use('/api/events', require('./routes/private/eventRouter'));
    app.use('/api/templates', require('./routes/private/templateRouter'));

    app.use('/', require('./middlewares/notFoundHandler'));
    app.use('/', require('./middlewares/genericErrorHandler'));

    require('http').createServer(app).listen(80);
    var credentials = {
        key: fs.readFileSync('sslcert/private.key', 'utf8'),
        cert: fs.readFileSync('sslcert/certificate.crt', 'utf8'),
        requestCert: false,
        rejectUnauthorized: false
    };
    var server = require('https').createServer(credentials, app).listen(443);
    var io = require('./global').io.public = ioModule.listen(server, { log: false });

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