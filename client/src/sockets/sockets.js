const client = {};

// Emitters
const emitLiveData = (liveData) => {
  // console.log('CLIENT.SOCKET: emitting data:', liveData);
  client.socket.emit('submit livedata', liveData);
};

// Used immediately on connection
const emitIsInvited = (userData) => {
  // console.log('CLIENT: userData', userData);
  const user = {
    id: userData.id,
    name: userData.name,
  };
  client.socket.emit('check invite', user);
};

const listenerController = (nsp, update, state) => {
  nsp.on('update connection', (numOfConnections) => {
    // console.log('CLIENT: connections to event:', numOfConnections);
    update.connectedPeers(numOfConnections);
  });

  nsp.on('update livedata', (liveData) => {
    // console.log('CLIENT.SOCKET: received data:', liveData);
    const indexOfData = state.liveData.reduce((accum, item, index) => {
      if (item.displayTitle === liveData.displayTitle) {
        return index;
      }
      return accum;
    }, -1);
    // console.log('CLIENT: index of livedata selected:', indexOfData);
    const newData = state.liveData.slice();
    const selectedData = newData[indexOfData];
    // console.log('CLIENT: selected data: selectedData', newData);
    selectedData.preference = liveData.preference;
    selectedData.votes = liveData.votes;
    selectedData.intensity = liveData.intensity;
    update.liveData(newData);
    const totalVotes = state.liveData.reduce((accum, item) => {
      const voteCount = accum + item.votes;
      return voteCount;
    }, 0);
    update.talliedVotes(totalVotes);
  });

  nsp.on('update peerlist', (peerList) => {
    console.log('CLIENT.SOCKET: updating expected peerlist:', peerList);
    update.inviteFriends(peerList);
  });
};

// Add Socket
const initSocket = (hash, reduxUpdater, reduxStates) => {
  const path = `/event/${hash}`;
  const socket = io(path);
  // console.log(`CLIENT: Connected to: ${path}`);
  client.socket = socket;
  listenerController(socket, reduxUpdater, reduxStates);

  // Does not check event owner
  if (reduxStates.user) {
    emitIsInvited(reduxStates.user);
  }
};

module.exports = {
  initSocket,
  emitLiveData,
};
