
import axios from 'axios';

export const postLogin = user => (
  axios.post('/login', user)
);

export const getStore = () => ({
  friends: sessionStorage.getItem('friends') || [],
  yelpData: sessionStorage.getItem('yelpData') || [],
  eventHash: sessionStorage.getItem('eventHash') || [],
  element: sessionStorage.getItem('element') || '',
  user: sessionStorage.getItem('user') || null,
  loaded: true,
});

// export const post = data => (
//   new Promise((resolve, reject) => {
//     resolve(data);
//   })
// );
