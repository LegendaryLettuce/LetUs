const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { User, UserFavs, Friends, CheckIns, Events } = require('./letUsSchema.js');

// modular insert function
const createHash = require('hash-generator');


const savetoDB = model => model.save()
  .then((data) => {
    console.log(JSON.stringify(data));
    return data;
  })
  .catch((err) => {
    console.log('Controller error', err);
  });

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// models to insert

const addUser = (data) => {
  const newUser = new User({
    userid: data.userid,
    pic: data.pic,
    phonenumber: data.number,
    friendrank: data.rank,
    lettuceleaves: data.leaves,
  });
  savetoDB(newUser);
};

const findUser = (data) => {
  User.findOne({ userid: data }, (err, user) => {
    if (!err) {
      return user;
    }
    return console.log('Find user', err);
  });
};

const getAllUsers = () => {
  User.find((err, users) => {
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

const retrieveEvents = () => {
  Events.findById('58753486363daf603924c8c0', (err, document) => {
    console.log(document);
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

const updateEvents = (data) => {
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
  console.log('controller received');
  return savetoDB(newEvents);
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
  updateEvents,
};

