const { User, UserFavs, Friends, CheckIns, Events } = require('./userSchema.js');

// modular insert function

const savetoDB = (model) => {
  model.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted into DB', data);
    }
  });
};

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

module.exports = {
  addUser,
  addFriend,
  addUserFavorites,
  addCheckIn,
  addEvent,
};
