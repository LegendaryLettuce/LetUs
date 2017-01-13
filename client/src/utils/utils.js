
import axios from 'axios';

export const postLogin = user => (
  axios.post('/login', user)
);

// TODO: attempt to load data from server if not in session
// TODO: lazy refresh data in background to keep up to date with server if necessary
export const getStore = () => ({
  friends: JSON.parse(sessionStorage.getItem('friends')) || [],
  yelpData: JSON.parse(sessionStorage.getItem('yelpData')) || [],
  eventHash: JSON.parse(sessionStorage.getItem('eventHash')) || [],
  element: JSON.parse(sessionStorage.getItem('element')) || '',
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  loaded: true,
  edp: JSON.parse(sessionStorage.getItem('user')) || {},
});


// Example format:
// export const post = data => (
//   new Promise((resolve, reject) => {
//     resolve(data);
//   })
// );
