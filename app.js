var createError = require('http-errors');
var flash = require('express-flash-messages');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homepageRouter = require('./routes/homepage');
var liedjeRouter = require('./routes/test');

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config/database');
var passport = require('passport');
var app = express();

//mongoose
var mongoose = require('mongoose');
var mongoDB = config.database;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//models
var User=require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    
})); 

app.use(flash());
//app.use(expressValidator());

//express messages
/*app.use(require('connect-flash')());
app.use(function(req,res,next){
    res.locals.messsages=require('express-messages')(req,res);
    next();
});*/

//Express Validator
app.use(expressValidator());
/*app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));*/

var port=process.env.PORT||8080
require('./config/passport')(passport);
// Passport init
app.use(passport.initialize());
app.use(passport.session());
// Global Vars
app.get('*',function(req, res, next){
    res.locals.user=req.user||null;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homepage', homepageRouter);
app.use('/liedje',liedjeRouter);
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



