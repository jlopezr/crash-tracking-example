var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bugsense = require('node-bugsense').setAPIKey('499ed547');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  require('longjohn');

  app.use(function(err, req, res, next) {
    if(!res.headersSent) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message || JSON.stringify(err),
        error: err
      });
    } else {
      console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
      console.error(err.stack);
    }
    bugsense.logError(err, {request:req.url, method:req.method});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if(!res.headersSent) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message || JSON.stringify(err),
      error: {}
    });
  } else {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
  }
  bugsense.logError(err, {request:req.url, method:req.method});
});

/*
setTimeout(function() {
  var x;
  var y = x.cacota;
},1000);
*/

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  bugsense.logError(error);
});

module.exports = app;
