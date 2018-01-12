'use strict';

var express = require('express');
var app = express();
var process = require('process'),
    path = require('path');

app.get('/', function (req, res) {
  return res.sendFile(path.join(process.cwd(), "html/home.html"));
});

app.use(express.static('public'));

app.listen(3000, function () {
  return console.log('Example app listening on port 3000!');
});