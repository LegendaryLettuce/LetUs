// const server = require('./app');
let server;

const updateClientsCount = (nsp, count) => {
  nsp.emit('update connection', count);
};

const add = (hash) => {
  let connectionsCounter = 0;
  if (!server) {
    console.log('FIRST TIME LOADED SOCKETS');
    server = require('./app');
  }
  const io = server.io;
  const nsp = io.of(`/event/${hash}`);
  nsp.on('connection', (socket) => {
    connectionsCounter++;
    console.log('SOCKET TEST');
    // console.log(socket.nsp.server.sockets);
    // const clientsCount = socket.conn.server.clientsCount;
    console.log(`Users Connected to: /event/${hash} || ${connectionsCounter}`);
    updateClientsCount(nsp, connectionsCounter);
    nsp.on('disconnect', () => {
      connectionsCounter--;
      console.log(`Users Disconnected from: /event/${hash} || ${connectionsCounter}`);
      updateClientsCount(nsp, connectionsCounter);
    });
  });
};

// need to generate namespaces  as the client sends a get requestto create
// an event

module.exports = {
  add,
};
