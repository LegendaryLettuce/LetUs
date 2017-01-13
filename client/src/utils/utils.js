
import axios from 'axios';

/**
 * Logs the user in
 * @param {Object} user - The user to log in
 * @param {string} user.id - The ID of the user
 * @param {string} user.name - The name of the user
 * @param {string} user.pic - The image url of the user's profile picture
 * @param {Object[]} user.friends - The friends of the user
 * @param {string} user.friends.id - The ID of the friend
 * @param {string} user.friends.name - The name of the friend
 * @returns {Promise.<string, Error>} Axios request to log the user in
 */
export const postLogin = user => (
  axios.post('/login', user)
);

/**
 * Logs the user in
 * @param {string} userId - The ID of the user to get the events of
 * @returns {Promise.<string, Error>} Axios request providing event data array in a JSON string
 */
export const getUpcomingEvents = userId => (
  axios.get(`/user/events/${userId}`)
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
