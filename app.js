const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const serveStatic   = require('serve-static');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const db            = require('./db/index');
const letUsSchema   = require('./db/letUsSchema');
const letUsRouter   = require('./routes/letUsRouter');

// const index = require('./routes/index');
// const users = require('./routes/users');
// const letUsRouter = require('./routes/letUsRouter');

const app = express();

// uncomment after placing your favicon in /client/src
// app.use(favicon(path.join(__dirname, 'client/dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(serveStatic(path.join(__dirname, 'client/dist'), {
  index: 'index.html',
}));

app.use('/', letUsRouter);

app.get('*', (req, res) => {
//   // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log('Connected on  ' + port);
});

// app.use('/', letUsRouter);

// app.use('/', index);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
