const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { engine } = require('express-handlebars')
const smysql = require('express-mysql-session')

const indexRouter = require('./routes/index');
const fotosRouter = require('./routes/fotos');
const { database, database_cc } = require('./keys');
const session = require('express-session');

const app = express();
require('dotenv').config()

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  defaultLayout: 'layout',
  layoutsDir: path.join(app.get('views')),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs');
let base_utilizar;

if(process.env.NODE_ENV== 'develop'){
  base_utilizar = database
}else{
  base_utilizar = database_cc
}

app.use(session({
  secret:'examen',
  resave: false,
  saveUninitialized: false,
  store: new smysql(base_utilizar)
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/fotos', fotosRouter);

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
