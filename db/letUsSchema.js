const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// connection to db
// TO DO: move to server
// mongoose.connect('mongodb://localhost/letus');

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
  yelpId: String,
  data: { type: String, required: true },
  attendees: [{ type: ObjectId, ref: 'Users' }],
  checkIns: [{ type: Boolean, ref: 'Users' }],
  linkHash: { type: String, required: true },
});

const Attendees = new Schema({
  collaborateID: Number,
  attendees: [String],
});

// add models to db
module.exports.Users = mongoose.model('Users', Users);
module.exports.Events = mongoose.model('Events', Events);

module.exports.Attendees = mongoose.model('Attendees', Attendees);
