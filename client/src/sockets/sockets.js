const client = {};

// Emitters
const emitLiveData = (liveData) => {
  console.log('CLIENT SOCKETS:', client);
  console.log('CLIENT.SOCKET: emitting data:', liveData);
  client.socket.emit('submit livedata', liveData);
};

const listenerController = (nsp, update) => {
  nsp.on('update connection', (numOfConnections) => {
    console.log('CLIENT: connections to event:', numOfConnections);
    update.connectedPeers(numOfConnections);
  });
  nsp.on('update livedata', (liveData) => {
    console.log('CLIENT.SOCKET: received data:', liveData);
  });
};

// Add Socket
const initSocket = (hash, updater) => {
  const path = `/event/${hash}`;
  const socket = io(path);
  console.log(`CLIENT: Connected to: ${path}`);
  client.socket = socket;
  listenerController(socket, updater);
};

module.exports = {
  initSocket,
  emitLiveData,
};
