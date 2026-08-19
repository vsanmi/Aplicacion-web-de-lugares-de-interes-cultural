var createError = require('http-errors');
var express = require('express');
var path = require('path');
require("dotenv").config();

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

const passport = require("./passport/setup");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const loginRouter =require('./routes/login');
const signupRouter =require('./routes/signup');
const inicioRouter =require('./routes/inicio');
const perfilRouter =require('./routes/perfil');
const acercadeRouter =require('./routes/acercade');
const favoritosRouter =require('./routes/favoritos');
const ayudaRouter =require('./routes/ayuda');

var {body, validationResult} = require('express-validator');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/culturapp';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Express Session
app.use(   
  session({
      secret: "very secret this is",
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport middleware
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(flash()); 

// view engine setup
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/JS'));
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/inicio', inicioRouter);
app.use('/perfil', perfilRouter);
app.use('/acerca-de', acercadeRouter);
app.use('/favoritos', favoritosRouter);
app.use('/ayuda', ayudaRouter);

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
