export const reducer = (state = {
  hello: 'Hello World!',
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
    default:
      return state;
  }
};
