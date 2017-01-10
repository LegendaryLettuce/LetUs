const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// define models
const Users = new Schema({
  name: { type: String, unique: true, required: true },
  pic: String,
  phoneNumber: String,
  friendRank: Number,
  lettuceLeaves: Number,
  friends: [{ type: ObjectId, ref: 'Users' }],
  favorites: [String], // yelp ids
});

const Events = new Schema({
  creator: { type: String, required: true },
  data: { type: String, required: true },
  attendees: [{ type: String, ref: 'Users' }], // change String back to ObjectId
  checkIns: [{ type: Boolean, ref: 'Users' }],
  linkHash: { type: String, required: true },
});

// add models to db
module.exports.Users = mongoose.model('Users', Users);
module.exports.Events = mongoose.model('Events', Events);

