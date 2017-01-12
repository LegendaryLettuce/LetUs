export const reducer = (state = {
  hello: 'Hello World!',
  friends: [],
  yelpData: [],
  liveData: [],
  eventHash: '',
  user: null,
  connectedPeers: 0,
  talliedVotes: 0,
}, action) => {
  switch (action.type) {
    case 'UPDATE_INVITE_FRIENDS':
      return {
        ...state,
        friends: action.friends,
      };
    case 'UPDATE_EVENT_HASH':
      return {
        ...state,
        eventHash: action.eventHash,
      };
    case 'UPDATE_YELP_DATA':
      return {
        ...state,
        yelpData: action.yelpData,
      };
    case 'ADD_LIVE_DATA':
      return {
        ...state,
        liveData: [
          ...state.liveData,
          action.element,
        ].sort((a, b) => ((b.preference * b.intensity) - (a.preference * a.intensity))),
      };
    case 'UPDATED_CONNECTED_PEERS':
      return {
        ...state,
        connectedPeers: action.connectedPeers,
      };
    case 'UPDATED_TALLIED_VOTES':
      return {
        ...state,
        talliedVotes: action.talliedVotes,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.token,
      };
    default:
      return state;
  }
};
