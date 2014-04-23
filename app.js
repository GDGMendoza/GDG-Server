
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gdg-db');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use('/', bodyParser());
app.use('/', cors());

app.use('/api/contributors', require('./routes/contributorRouter'));
app.use('/api/posts', require('./routes/postRouter'));
app.use('/api/events', require('./routes/eventRouter'));


app.listen(3000);