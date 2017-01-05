export const reducer = (state = {
  hello: 'Hello World!',
  friends: [],
}, action) => {
  switch (action.type) {
    case 'ACTION_TYPE_1':
      return {
        ...state,
      };
    case 'ACTION_TYPE_2':
      return {
        ...state,
      };
    case 'UPDATE_INVITE_FRIENDS':
      return {
        ...state,
        friends: action.friends,
      };
    default:
      return state;
  }
};
