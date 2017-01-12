/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const Yelp = require('yelp');
const apikeys = require('./../config/yelp-api.js');

mongoose.Promise = require('bluebird');

const { Users, UserFavs, Friends, CheckIns, Events } = require('./letUsSchema.js');

// modular insert function
const createHash = require('hash-generator');

const socket = require('./../sockets');

const savetoDB = model => model.save()
  .then((data) => {
    // console.log(JSON.stringify(data));
    return data;
  })
  .catch((err) => {
    console.log('Controller error', err);
  });

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// models to insert

const addUser = (data) => {
  const newUser = new Users({
    id: data.id,
    name: data.name,
    pic: data.pic,
    phoneNumber: (data.number) ? data.number : 0,
    friendRank: 0,
    lettuceLeaves: 0,
    friends: (data.friends.length > 0) ? data.friends.map(friend => friend.id) : [],
    favorites: [],
  });
  return newUser.save();
};

const findUser = data => Users.findOne({ id: data });

const getAllUsers = () => {
  Users.find((err, users) => {
    if (!err) {
      return users;
    }
    return console.log('getAllUsers', err);
  });
};

const addUserFavorites = (data) => {
  const newUserFav = new UserFavs({
    userid: data.userid,
    favoriteid: data.favid,
  });
  savetoDB(newUserFav);
};

const addFriend = (data) => {
  const newFriend = new Friends({
    userid: data.userid,
    friendid: data.friendid,
  });
  savetoDB(newFriend);
};


const addCheckIn = (data) => {
  const newCheckIn = new CheckIns({
    attendee: data.attendee,
    eventid: data.eventid,
    checkedin: data.checkedin,
  });
  savetoDB(newCheckIn);
};

const addEvent = (data) => {
  const newEvent = new Events({
    eventlord: data.eventlord,
    attendee: data.attendee,
    eventid: data.eventid,
    checkedin: data.checkedin,
  });
  savetoDB(newEvent);
};

// controllers for Invite -> Collaborate view

// use created event ID that is attached to the userID, save invited friends to that row

// collection.findOne({_id: doc_id}, function(err, document) {
//   console.log(document.name);
// });

const retrieveEvents = (data) => {
  const hash = data.params[0];
  return Events.findOne({ linkHash: hash })
      .then((doc) => {
        if (!doc) {
          return null;
        }
        return doc;
      });
};

const createNewHash = (data) => {
  const hashLength = 6;
  const hash = createHash(hashLength);

  return Events.findOne({ linkHash: hash })
    .then((doc) => {
      if (!doc) {
        return hash;
      }
      return createNewHash();
    });
};

const createEvent = (data) => {
  // console.log(data);
  // console.log('EVENTS BODY FROM CONTROLLER', data.body);

  // db.events.find( { _id: { $in: [ ObjectId("58753486363daf603924c8c0") ] } } )
  const newEvents = new Events({
    creator: data.body.creator,
    yelpId: data.body.yelpId,
    data: data.body.data,
    attendees: data.body.attendees,
    checkIns: data.body.checkIns,
    linkHash: data.body.hash,
  });
  // console.log('controller received');
  return savetoDB(newEvents);
};

const updateEventAttendees = (data) => {
  const hash = data.body.linkHash;
  return Events.findOne({ linkHash: hash })
    .then((doc) => {
      doc.attendees = data.body.attendees;
      return savetoDB(doc);
    });
};

const retrieveYelpData = (lat, lng) => {
  // console.log('Line 148: ',lat, lng);
  const yelp = new Yelp(apikeys);
  const cll = `${lat},${lng}`;
  // console.log(cll);
  // See http://www.yelp.com/developers/documentation/v2/search_api
  const queries = [{
    term: 'food',
    ll: cll,
  }, {
    term: 'nightlife',
    ll: cll,
  }, {
    term: 'active',
    ll: cll,
  }];
  // TODO: check for wrong lat and long in request
  const terms = ['eat', 'drink', 'play'];
  const request = {};
  queries.forEach((searchTerm, i) => {
    yelp.search(searchTerm)
      .then((data) => {
        request[terms[i]] = data;
      })
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        return request;
      });
  });
};

module.exports = {
  addUser,
  addFriend,
  addUserFavorites,
  addCheckIn,
  addEvent,
  findUser,
  getAllUsers,
  createNewHash,
  retrieveEvents,
  createEvent,
  updateEventAttendees,
  retrieveYelpData,
};
