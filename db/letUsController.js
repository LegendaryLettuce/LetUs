const { User, UserFavs, Friends, CheckIns, Events } = require('./letUsSchema.js');

// modular insert function

const savetoDB = (model) => {
  model.save((err, data) => {
    if (err) {
      console.log('Controller error', err);
    } else {
      console.log('Inserted into DB', data);
    }
  });
};

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

// const retrieveCollaborate = () => {
//   Event.find((err, users) => {
//     if (!err) {
//       return users;
//     }
//     return console.log('getAllUsers', err);
//   });
// };


const updateEvents = (data) => {
  // console.log(data);
  const newEvents = new Events({
    creator: data.body.creator,
    yelpId: data.body.yelpId,
    data: data.body.data,
    attendees: data.body.attendees,
    checkIns: data.body.checkIns,
    linkHash: data.params.string,
  });
  savetoDB(newEvents);
  console.log('controller received');
};

module.exports = {
  addUser,
  addFriend,
  addUserFavorites,
  addCheckIn,
  addEvent,
  findUser,
  getAllUsers,
  updateEvents,

};

