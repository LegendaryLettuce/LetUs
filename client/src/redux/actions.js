
export const updateInviteFriends = friends => ({ type: 'UPDATE_INVITE_FRIENDS', friends });

export const updateYelpData = yelpData => ({ type: 'UPDATE_YELP_DATA', yelpData });

export const addLiveData = element => ({ type: 'ADD_LIVE_DATA', element });

export const updateEventHash = eventHash => ({ type: 'UPDATE_EVENT_HASH', eventHash });

export const updateUser = token => ({ type: 'UPDATE_USER', token });

export const updateConnectedPeers = connectedPeers => ({ type: 'UPDATED_CONNECTED_PEERS', connectedPeers });

export const updateTalliedVotes = talliedVotes => ({ type: 'UPDATED_TALLIED_VOTES', talliedVotes });

export const updateCoords = coords => ({ type: 'UPDATE_COORDS', coords });
