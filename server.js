const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const favicon = require('favicon')
require('dotenv').config();
require('./config/db')
var app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use('/api/users', require('./routes/api'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname, 'build', '/index.html')
});

var port = process.env.PORT || 3001;
http.listen(port, function() {
});