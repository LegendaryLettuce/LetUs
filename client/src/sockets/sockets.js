// export to loading.jsx and invite.jsx as addSockets

const listenConnectedPeers = (nsp, updateConnectedPeers) => {
  nsp.on('update connection', (numOfConnections) => {
    console.log('SOCKEETTTTTSSSSSSS');
    console.log(numOfConnections);
    updateConnectedPeers(numOfConnections);
  });
};

module.exports = (hash, updateConnectedPeers, updateTalliedVotes) => {
  const socket = io(`/event/${hash}`);
  listenConnectedPeers(socket, updateConnectedPeers);
};

