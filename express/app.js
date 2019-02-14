// var createError = require('http-errors');
const http = require('http');
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

app.use((req, res, next) => {
  console.log('1111');
  next(); // Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
  console.log('2222');
  res.send('<h2>Hello World</h2>'); // express는 기존의 node.js 메소드도 쓸 수 있지만 추가로 send 메소드를 제공하는데 이는 자동으로 response에 문서타입을 text/html로 설정해준다. 기존에 text/html을 header에 안 붙여도 자동으로 된다.
  // https://github.com/expressjs/express/blob/master/lib/response.js 
  // switch (typeof chunk) {
  //   // string defaulting to html
  //   case 'string':
  //     if (!this.get('Content-Type')) { // 해당부분이 없으면 기본으로 html
  //       this.type('html');
  //     }
  //     break;
  //   case 'boolean':
  //   case 'number':
  //   case 'object':
  //     if (chunk === null) {
  //       chunk = '';
  //     } else if (Buffer.isBuffer(chunk)) {
  //       if (!this.get('Content-Type')) {
  //         this.type('bin');
  //       }
  //     } else {
  //       return this.json(chunk);
  //     }
  //     break;
  // }
});

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// const server = http.createServer(app);

// server.listen(3000);

app.listen(3000); // 간단히 가능하다



// module.exports = app;
