
import axios from 'axios';

export const postLogin = user => (
  axios.post('/login', user)
);

export const getStore = () => ({
  friends: JSON.parse(sessionStorage.getItem('friends')) || [],
  yelpData: JSON.parse(sessionStorage.getItem('yelpData')) || [],
  eventHash: JSON.parse(sessionStorage.getItem('eventHash')) || [],
  element: JSON.parse(sessionStorage.getItem('element')) || '',
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  loaded: true,
});

// export const post = data => (
//   new Promise((resolve, reject) => {
//     resolve(data);
//   })
// );
