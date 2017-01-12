// const server = require('./app');
let server;
let letUsController;

const updateClientsCount = (socket, count) => {
  socket.emit('update connection', count);
};

const updateData = (socket, liveData) => {
  if (!letUsController) {
    console.log('Loaded DB Controller');
    letUsController = require('./db/letUsController');
  }
  const hash = socket.nsp.name.split('/')[2];
  console.log(`SOCKET: event hash: ${hash}`);
  letUsController.handleClientVotes(hash, liveData)
    .then((doc) => {
      socket.emit('update livedata', doc.data);
    });
};

const handleLiveData = (socket) => {
  console.log('SOCKET: loaded event listeners');
  // console.log(socket);
  socket.on('submit livedata', (liveData) => {
    console.log('SERVER: recieved liveData');
    updateData(socket, liveData);
  });
};

const add = (hash) => {
  let connectionsCounter = 0;
  if (!server) {
    console.log('SOCKETS: loaded server dependancies');
    server = require('./app');
  }
  const io = server.io;
  const nsp = io.of(`/event/${hash}`);
  nsp.on('connection', (socket) => {
    connectionsCounter++;
    // console.log('SOCKET TEST');
    // console.log(socket.nsp.server.sockets);
    // const clientsCount = socket.conn.server.clientsCount;
    console.log(`SOCKET: user connected to: /event/${hash} || ${connectionsCounter}`);
    updateClientsCount(nsp, connectionsCounter);
    handleLiveData(socket);
    socket.on('disconnect', () => {
      connectionsCounter--;
      console.log(`SOCKET: user disconnected from: /event/${hash} || ${connectionsCounter}`);
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
