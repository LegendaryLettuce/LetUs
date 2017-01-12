
export const updateInviteFriends = friends => ({ type: 'UPDATE_INVITE_FRIENDS', friends });

export const updateEventHash = eventHash => ({ type: 'UPDATE_EVENT_HASH', eventHash });

export const updateYelpData = yelpData => ({ type: 'UPDATE_YELP_DATA', yelpData });

export const addLiveData = element => ({ type: 'ADD_LIVE_DATA', element });

export const updateUser = user => ({ type: 'UPDATE_USER', user });

export const updateConnectedPeers = connectedPeers => ({ type: 'UPDATED_CONNECTED_PEERS', connectedPeers });

export const updateTalliedVotes = talliedVotes => ({ type: 'UPDATED_TALLIED_VOTES', talliedVotes });

export const load = state => ({ type: 'LOAD', state });
