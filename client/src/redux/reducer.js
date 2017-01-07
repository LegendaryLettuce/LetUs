export const reducer = (state = {
  hello: 'Hello World!',
  friends: [],
  yelpData: [],
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
    default:
      return state;
  }
};
