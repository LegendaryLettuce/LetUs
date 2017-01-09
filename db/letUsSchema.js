const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// connection to db
// TO DO: move to server
// mongoose.connect('mongodb://localhost/letus');

// define models
const userSchema = new Schema({
  userid: { type: String, unique: true, required: true },
  pic: String,
  phonenumber: String,
  friendrank: Number,
  lettuceleaves: Number,
});

const userFavoritesSchema = new Schema({
  userid: { type: String, unique: true, required: true },
  favoriteid: String,
});

const userFriendsSchema = new Schema({
  userid: { type: String, unique: true, required: true },
  friendid: String,
});

const checkInsSchema = new Schema({
  attendee: String,
  eventid: String,
  checkedin: { type: Boolean, unique: true, required: true },
});

const eventsSchema = new Schema({
  eventlord: { type: String, unique: true, required: true },
  yelpid: String,
  attendees: String,
});

const attendeesSchema = new Schema({
  collaborateID: Number,
  attendees: [String],
});

// add models to db
const User = mongoose.model('User', userSchema);
const UserFavs = mongoose.model('UserInfo', userFavoritesSchema);
const Friends = mongoose.model('Friends', userFriendsSchema);
const CheckIns = mongoose.model('CheckIns', checkInsSchema);
const Events = mongoose.model('Events', eventsSchema);

const Attendees = mongoose.model('Attendees', attendeesSchema);


// modularize code for controller
module.exports = {
  User,
  UserFavs,
  Friends,
  CheckIns,
  Events,
  Attendees,
};
