// const server = require('./app');
let server;

const add = (hash) => {
  if (!server) {
    console.log('FIRST TIME LOADED SOCKETS');
    server = require('./app');
  }
  const io = server.io;
  const eventNameSpace = '/event/';
  console.log('Adding socket event listener for: ', hash);
  const nsp = io.of(eventNameSpace.concat(hash));
  nsp.on('connection', (socket) => {
    console.log(`User Connected to: /event/${hash}`);
  });
};

// need to generate namespaces  as the client sends a get requestto create
// an event

module.exports = {
  add,
};
