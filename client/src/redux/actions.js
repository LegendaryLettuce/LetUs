
export const updateInviteFriends = (friends) => {
  sessionStorage.setItem('friends', JSON.stringify(friends));
  return { type: 'UPDATE_INVITE_FRIENDS', friends };
};

export const updateEventHash = (eventHash) => {
  sessionStorage.setItem('eventHash', JSON.stringify(eventHash));
  return { type: 'UPDATE_EVENT_HASH', eventHash };
};

export const updateYelpData = (yelpData) => {
  sessionStorage.setItem('yelpData', JSON.stringify(yelpData));
  return { type: 'UPDATE_YELP_DATA', yelpData };
};

export const updateLiveData = (liveData) => {
  const newLiveData = [
    ...liveData,
  ].sort((a, b) => ((b.preference * b.intensity) - (a.preference * a.intensity)));
  sessionStorage.setItem('liveData', JSON.stringify(newLiveData));
  return { type: 'UPDATE_LIVE_DATA', newLiveData };
};

export const updateUser = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
  return { type: 'UPDATE_USER', user };
};

export const updateCoords = (coords) => {
  sessionStorage.setItem('coords', JSON.stringify(coords));
  return { type: 'UPDATE_COORDS', coords };
};

export const updateEDP = (edp) => {
  sessionStorage.setItem('edp', JSON.stringify(edp));
  return { type: 'UPDATE_EDP', edp };
};

export const updateConnectedPeers = connectedPeers => ({ type: 'UPDATED_CONNECTED_PEERS', connectedPeers });

export const updateTalliedVotes = talliedVotes => ({ type: 'UPDATED_TALLIED_VOTES', talliedVotes });

export const updateHomeEventPage = homeEventPageData => ({ type: 'UPDATE_HOME_EVENT_PAGE', homeEventPageData });

export const updateEventPage = eventPageData => ({ type: 'UPDATE_EVENT_PAGE', eventPageData });

export const updateParentPage = parentPage => ({ type: 'UPDATE_PARENT_PAGE', parentPage });

export const updateSelectedView = selectedView => ({ type: 'UPDATE_SELECTED_VIEW', selectedView });

export const updateSelectedViewIndex = selectedViewIndex => ({ type: 'UPDATE_SELECTED_INDEX', selectedViewIndex });


// DO NOT STORE IN SESSION
export const load = state => ({ type: 'LOAD', state });

export const loadFB = loaded => ({ type: 'LOAD_FB', loaded });

export const updateGoogleMaps = loadGoogleMaps => ({ type: 'UPDATE_GOOGLEMAPS', loadGoogleMaps });
