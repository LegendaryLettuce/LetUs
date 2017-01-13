const client = {};

// Emitters
const emitLiveData = (liveData) => {
  console.log('CLIENT SOCKETS:', client);
  console.log('CLIENT.SOCKET: emitting data:', liveData);
  client.socket.emit('submit livedata', liveData);
};

const listenerController = (nsp, update, state) => {
  nsp.on('update connection', (numOfConnections) => {
    console.log('CLIENT: connections to event:', numOfConnections);
    update.connectedPeers(numOfConnections);
  });
  nsp.on('update livedata', (liveData) => {
    console.log('CLIENT.SOCKET: received data:', liveData);
    // if (!state.liveData.length) {
    //   console.log('LOADING LIVE DATA WITH YELP:', state.yelpData);
    //   console.log('UPDATERS:', update);
    //   update.liveData(state.yelpData);
    // }
    console.log('CLIENT: yelpdata state:', state.yelpData);
    console.log('CLIENT: livedata state:', state.liveData);
    const indexOfData = state.liveData.reduce((accum, item, index) => {
      if (item.displayTitle === liveData.displayTitle) {
        return index;
      }
      return accum;
    }, -1);
    console.log('CLIENT: index of livedata selected:', indexOfData);
    const newData = state.liveData.slice();
    const selectedData = newData[indexOfData];
    console.log('CLIENT: selected data: selectedData', newData);
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
};

// Add Socket
const initSocket = (hash, reduxUpdater, reduxStates) => {
  const path = `/event/${hash}`;
  const socket = io(path);
  console.log(`CLIENT: Connected to: ${path}`);
  client.socket = socket;
  listenerController(socket, reduxUpdater, reduxStates);
};

module.exports = {
  initSocket,
  emitLiveData,
};
