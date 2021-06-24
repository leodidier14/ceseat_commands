var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var router = require('./routes/routes');

var app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);


// error handler
app.use(function(err, req, res, next) {
  next()
});

module.exports = app;
