var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//跨域中间件 或者用 require('cors');
const disableCache = function(req, res, next) {
  //调试阶段，设置header告诉浏览器不要缓存http的响应，否则浏览器会到缓存里面拿，后台显示的请求为304
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')  // HTTP 1.1
  // res.header('Pragma', 'no-cache')     //HTTP 1.0
  // res.header('Expires', '0')           //Proxies
  next()
}

app.use(disableCache);

// //跨域中间件 或者用 require('cors');
// const crossDomain = function(req, res, next) {
//   //当需要设置cookies时 origin不能为*
//   //处理跨域请求
//   console.log('handle crossDomain:', req.method)
//   // res.header('Access-Control-Allow-Origin', req.headers.origin)
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-XSRF-TOKEN')
//   res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE,PUT')
//   res.header('Access-Control-Allow-Credentials', true)
//   //CSP Settings
//   // res.header('Content-Security-Policy', "default-src 'self';")
//   req.method === 'OPTIONS' ? res.status(204).end() : next()
// }

// app.use(crossDomain);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
