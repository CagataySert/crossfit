const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//import db
require('./db/db.init');
//import middlewares
const { protect } = require('./middlewares/auth.js');
//import controllers
const { signup, signin } = require('./api/controllers/auth.controller');

//import routers
const {
  coachRouter,
  movementRouter,
  sectionRouter,
  wodRouter,
  userRouter
} = require('./api/routes/index.router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use('/api', protect);

//Routers
app.post('/signup', signup);
app.post('/signin', signin);

app.use('/api/user', userRouter);
app.use('/api/coach', coachRouter);
app.use('/api/movement', movementRouter);
app.use('/api/section', sectionRouter);
app.use('/api/wod', wodRouter);

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
  res.render('error');
});

module.exports = app;
