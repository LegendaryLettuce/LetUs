const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// define models
const Users = new Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  pic: String,
  phoneNumber: String,
  friendRank: Number,
  lettuceLeaves: Number,
  friends: [{ type: String }],
  favorites: [String], // yelp ids
});

const Events = new Schema({
  creator: { type: String, required: true },
  data: { type: String, required: true },
  attendees: { type: String }, // change String back to ObjectId
  checkIns: [{ type: Boolean }],
  linkHash: { type: String, required: true },
  topEvent: { type: String },
});

const EventGoers = new Schema({
  userId: { type: String, required: true },
  event: { type: ObjectId, ref: 'Events', required: true },
});

// add models to db
module.exports.Users = mongoose.model('Users', Users);
module.exports.Events = mongoose.model('Events', Events);
module.exports.EventGoers = mongoose.model('EventGoers', EventGoers);
