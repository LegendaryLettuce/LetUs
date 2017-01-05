const Sequelize = require('sequelize');

// connect to letus with no username and password (null,null)
sequelize = new Sequelize('letus', null, null,
  {
    dialect: 'postgres',
    port: 5432,
  });

sequelize
  .authenticate()
  .then((err) => {
    console.log('Connection has been established successfully.');
  }, (err) => {
    console.log('Unable to connect to the database:', err);
  });

// schemas for DB
// taken from EDS
exports.User = sequelize.define('User', {
  userid: { type: Sequelize.STRING, allowNull: false },
  pic: Sequelize.STRING,
  phonenumber: Sequelize.STRING,
  friendrank: Sequelize.STRING,
  lettuceleaves: Sequelize.STRING,
});

exports.UserFavorites = sequelize.define('UserFavorites', {
  userid: { type: Sequelize.STRING, allowNull: false },
  favoriteid: Sequelize.STRING,
});p

exports.UserFriends = sequelize.define('UserFriends', {
  userid: { type: Sequelize.STRING, allowNull: false },
  friendid: Sequelize.STRING,
});

exports.CheckIns = sequelize.define('CheckIns', {
  attendee: Sequelize.STRING,
  eventid: Sequelize.STRING,
  checkedin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
});

exports.Events = sequelize.define('Events', {
  eventlord: { type: Sequelize.STRING, allowNull: false },
  yelpid: Sequelize.STRING,
  attendees: Sequelize.STRING,
});

exports.Favorites = sequelize.define('Favorites', {
  yelpid: Sequelize.STRING,
});

// add all tables into the db
sequelize
  .sync({ force: true })
  .then((err) => {
    console.log('It worked!');
  }, (err) => {
    console.log('An error occurred while creating the table:', err);
  });

  var usertable = exports.User.build({
    userid: 'john',
  });
  // Inserting Data into database
  usertable.save().then(function(err) {
    console.log('It worked');
  })
  .catch(function(err) {
    console.log(err);
  });

  exports.User.sync();
