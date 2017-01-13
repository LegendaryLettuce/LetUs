/* eslint-disable no-case-declarations */
export const reducer = (state = {
  friends: [],
  yelpData: [],
  liveData: [],
  eventHash: '',
  user: {},
  connectedPeers: 0,
  talliedVotes: 0,
  loaded: false,
  fbLoaded: false,
  coords: [],
  edp: {},
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
    // case 'ADD_LIVE_DATA':
    //   const data = [
    //     ...state.liveData,
    //     action.element,
    //   ].sort((a, b) => ((b.preference * b.intensity) - (a.preference * a.intensity)));
    //   sessionStorage.setItem('liveData', JSON.stringify(data));
    //   return {
    //     ...state,
    //     liveData: data,
    //   };
    case 'UPDATE_LIVE_DATA':
      // console.log('UPDATING LIVE DATA: action livedata:', action.liveData);
      // const newLiveData = [
      //   ...action.liveData,
      // ].sort((a, b) => ((b.preference * b.intensity) - (a.preference * a.intensity)));
      // sessionStorage.setItem('liveData', JSON.stringify(newLiveData));
      // console.log('NEW LIVE DATA:', newLiveData);
      return {
        ...state,
        liveData: action.newLiveData,
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
      // DO NOT STORE IN SESSION
      return {
        ...state,
        ...action.state,
      };
    case 'LOAD_FB':
      // DO NOT STORE IN SESSION
      return {
        ...state,
        fbLoaded: action.loaded,
      };
    case 'UPDATE_COORDS':
      return {
        ...state,
        coords: action.coords,
      };
    case 'UPDATE_EDP':
      return {
        ...state,
        edp: action.edp,
      };
    default:
      return state;
  }
};
