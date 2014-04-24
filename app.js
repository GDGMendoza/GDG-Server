"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gdg-db');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//var expressJwt = require('express-jwt');
//var config = require('./local');

var app = express();
app.use('/', bodyParser());
app.use('/', cors());

app.use('/contributors', require('./routes/public/contributorRouter'));
app.use('/posts', require('./routes/public/postRouter'));
app.use('/events', require('./routes/public/eventRouter'));
app.use('/auth', require('./routes/public/authRouter'));

//app.use('/api', expressJwt({ secret: config.secret }));
app.use('/api/users', require('./routes/private/userRouter'));
app.use('/api/posts', require('./routes/private/postRouter'));
app.use('/api/events', require('./routes/private/eventRouter'));
app.use('/api/templates', require('./routes/private/templateRouter'));

app.use('/', function (req, res) {
    res.json(404, { error: 'Recurso solicitado inexistente' });
});

app.listen(3000);