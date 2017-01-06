const { User, UserInfo, Friends, CheckIns, Events, Favorites } = require('./userSchema.js');

// inserting for now, middleware later

const newUser = new User({
  userid: 'john doe',
  pic: 'https://www.occrp.org/images/stories/CCWatch/16147_2.jpg',
  phonenumber: '555-555-5555',
  friendrank: 1,
  lettuceleaves: 0,
});

newUser.save((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Inserted');
  }
});
