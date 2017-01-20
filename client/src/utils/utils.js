
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

/**
 * Gets the url for a large format yelp image from the url for a small square format yelp image
 * @param {string} url - The url of the small square format yelp image
 * @returns {string} The url of the large format yelp image
 */
export const getUrl = url => (
  `${url.slice(0, url.length - 6)}l${url.slice(url.length - 4, url.length)}`
);

/**
 * Converts a numeral rating to an array
 * @param {number} rating - The rating from 0 to 5 by intervals of 0.5
 * @returns {Array} An array with 0s for full stars and ones for half stars
 */
export const ratingToArray = (rating) => {
  const a = new Array(Math.floor(rating)).fill(0);
  if (rating - Math.floor(rating) !== 0) a.push(1);
  return a;
};

export const getStore = () => ({
  friends: JSON.parse(sessionStorage.getItem('friends')) || [],
  eventHash: JSON.parse(sessionStorage.getItem('eventHash')) || '',
  yelpData: JSON.parse(sessionStorage.getItem('yelpData')) || [],
  liveData: JSON.parse(sessionStorage.getItem('liveData')) || [],
  user: JSON.parse(sessionStorage.getItem('user')) || {},
  coords: JSON.parse(sessionStorage.getItem('coords')) || {},
  edp: JSON.parse(sessionStorage.getItem('edp')) || {},
  loaded: true,
});

export const loadFacebook = (redux) => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: '1233081016779123',
      cookie: true,
      xfbml: true,
      version: 'v2.8',
    });
    FB.AppEvents.logPageView();
    redux();
  };
  (((d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    const js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk'));
};
