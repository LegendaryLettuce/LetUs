
import axios from 'axios';

export const postLogin = user => (
  axios.post('/login', user)
);

// export const post = data => (
//   new Promise((resolve, reject) => {
//     resolve(data);
//   })
// );
