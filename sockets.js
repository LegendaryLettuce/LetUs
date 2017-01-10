const addSockets = (io, hash) => {
  const eventNameSpace = '/event/';
  const nsp = io.of(eventNameSpace.concat(hash));
  nsp.on('connection', (socket) => {
    console.log(`User Connected to: ${hash}`);
  });
};

// need to generate namespaces as the client sends a get requestto create
// an event



module.exports = addSockets;
