const express       = require('express');
const path          = require('path');
const serveStatic   = require('serve-static');
const session       = require('express-session');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');

require('./db/index');
require('./db/letUsSchema');

const fb            = require('./config/facebook-secret');

const letUsRouter   = require('./routes/letUsRouter');
const loginRouter   = require('./routes/loginRouter');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: fb,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2628000000,
    httpOnly: true,
  },
}));

app.use(serveStatic(path.join(__dirname, 'client/dist'), {
  index: 'index.html',
}));

app.use('/login', loginRouter);

app.use('/c/:eventHash', (req, res, next) => {
  if (req.session && !req.session.userId) {
    // eslint-disable-next-line no-param-reassign
    req.session.eventHash = req.params.eventHash;
  }
  next();
});

app.use('*', (req, res, next) => {
  if (req.session && req.session.userId) next();
  else res.redirect('/');
});

app.use('/', letUsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Connected on ${port}`);
});

const io = require('socket.io').listen(server);

module.exports = {
  app,
  io,
};
