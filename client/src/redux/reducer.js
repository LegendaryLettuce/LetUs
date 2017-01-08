export const reducer = (state = {
  hello: 'Hello World!',
  friends: [],
  yelpData: [],
  liveData: [],
}, action) => {
  switch (action.type) {
    case 'UPDATE_INVITE_FRIENDS':
      return {
        ...state,
        friends: action.friends,
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
    default:
      return state;
  }
};
