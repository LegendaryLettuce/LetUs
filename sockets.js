// const server = require('./app');
let server;

const updateClientsCount = (nsp, count) => {
  nsp.emit('update connection', count);
};

const handleLiveData = (socket) => {
  console.log('loaded handler for live data');
  // console.log(socket);
  socket.on('submit livedata', (liveData) => {
    console.log('SERVER: recieved liveData');
    socket.broadcast.emit('update livedata', liveData);
  });
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
    // console.log('SOCKET TEST');
    // console.log(socket.nsp.server.sockets);
    // const clientsCount = socket.conn.server.clientsCount;
    console.log(`Users Connected to: /event/${hash} || ${connectionsCounter}`);
    updateClientsCount(nsp, connectionsCounter);
    handleLiveData(socket);
    socket.on('disconnect', () => {
      connectionsCounter--;
      console.log(`Users Disconnected from: /event/${hash} || ${connectionsCounter}`);
      updateClientsCount(nsp, connectionsCounter);
    });
  });
  // handleLiveData(nsp);
};

// need to generate namespaces  as the client sends a get requestto create
// an event

module.exports = {
  add,
};
