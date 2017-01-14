/* eslint-disable no-case-declarations */
export const reducer = (state = {
  friends: [],
  eventHash: '',
  yelpData: [],
  liveData: [],
  user: {},
  connectedPeers: 0,
  talliedVotes: 0,
  coords: [],
  edp: {},
  eventPageData: {},
  parentPage: '/',
  selectedView: 'Create',
  selectedViewIndex: 0,
  loadGoogleMaps: false,
  loaded: false,
  fbLoaded: false,
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
    case 'UPDATE_LIVE_DATA':
      return {
        ...state,
        liveData: action.newLiveData,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.user,
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
    case 'UPDATE_EVENT_PAGE':
      return {
        ...state,
        eventPageData: action.eventPageData,
      };
    case 'UPDATE_PARENT_PAGE':
      return {
        ...state,
        parentPage: action.parentPage,
      };
    case 'UPDATE_SELECTED_VIEW':
      return {
        ...state,
        selectedView: action.selectedView,
      };
    case 'UPDATE_SELECTED_INDEX':
      return {
        ...state,
        selectedViewIndex: action.selectedViewIndex,
    case 'UPDATE_GOOGLEMAPS':
      return {
        ...state,
        loadGoogleMaps: action.loadGoogleMaps,
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
    default:
      return state;
  }
};
