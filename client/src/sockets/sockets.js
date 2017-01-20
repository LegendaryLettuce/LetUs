const client = {};

// Emitters
const emitLiveData = (liveData) => {
  client.socket.emit('submit livedata', liveData);
};

// Used immediately on connection
const emitIsInvited = (userData) => {
  const user = {
    id: userData.id,
    name: userData.name,
  };
  client.socket.emit('check invite', user);
};

const listenerController = (nsp, update, state) => {
  nsp.on('update connection', (numOfConnections) => {
    update.connectedPeers(numOfConnections);
  });

  nsp.on('update livedata', (liveData) => {
    const indexOfData = state.liveData.reduce((accum, item, index) => {
      if (item.displayTitle === liveData.displayTitle) {
        return index;
      }
      return accum;
    }, -1);
    const newData = state.liveData.slice();
    const selectedData = newData[indexOfData];
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
    update.inviteFriends(peerList);
  });
};

// Add Socket
const initSocket = (hash, reduxUpdater, reduxStates) => {
  const path = `/event/${hash}`;
  const socket = io(path);
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
