var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const personsRouter = require('./routes/persons');
const utilsRouter = require('./routes/utils');
const projectsRouter = require('./routes/projects');
const trackingRouter = require('./routes/tracking');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//TODO: Update routes to match DB!

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Person', personsRouter);
app.use('/utils', utilsRouter);
app.use('/projects', projectsRouter);
app.use('/Tracking', trackingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
