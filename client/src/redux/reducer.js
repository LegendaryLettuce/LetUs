/* eslint-disable no-case-declarations */
export const reducer = (state = {
  friends: [],
  yelpData: [],
  liveData: [],
  eventHash: '',
  user: null,
  connectedPeers: 0,
  talliedVotes: 0,
  loaded: false,
  fbLoaded: false,
  coords: [],
}, action) => {
  switch (action.type) {
    case 'UPDATE_INVITE_FRIENDS':
      sessionStorage.setItem('friends', JSON.stringify(action.friends));
      return {
        ...state,
        friends: action.friends,
      };
    case 'UPDATE_EVENT_HASH':
      sessionStorage.setItem('eventHash', JSON.stringify(action.eventHash));
      return {
        ...state,
        eventHash: action.eventHash,
      };
    case 'UPDATE_YELP_DATA':
      sessionStorage.setItem('yelpData', JSON.stringify(action.yelpData));
      return {
        ...state,
        yelpData: action.yelpData,
      };
    case 'ADD_LIVE_DATA':
      const data = [
        ...state.liveData,
        action.element,
      ].sort((a, b) => ((b.preference * b.intensity) - (a.preference * a.intensity)));
      sessionStorage.setItem('liveData', JSON.stringify(data));
      return {
        ...state,
        liveData: data,
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
      sessionStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...state,
        user: action.user,
      };
    case 'LOAD':
      return {
        ...state,
        ...action.state,
      };
    case 'LOAD_FB':
      return {
        ...state,
        fbLoaded: action.loaded,
      };
    case 'UPDATE_COORDS':
      return {
        ...state,
        coords: action.coords,
      };
    case 'UPDATE_COORDS':
      return {
        ...state,
        coords: action.coords,
      };
    default:
      return state;
  }
};
