'use strict';
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require("passport");
let session = require("express-session");

mongoose.Promise = global.Promise;
// let MONGO_URI = process.env.MONGO_URI;
mongoose.connect('mongodb://boss:makesign@ds153577.mlab.com:53577/sale_manage').then(()=>{
    console.log('DB is connected ...')
});

let index = require('./routes/index');
let user = require('./routes/user');
let update = require('./routes/update');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'Alan',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*60*24*5
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.user = req.user||null;
    next();
})
app.use('/', index);
app.use('/user', user);
app.use('/update', update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
require('./config/passport')(passport);

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
