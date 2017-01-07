const Sequelize = require('sequelize');

// connect to letus with no username and password (null,null)
const sequelize = new Sequelize('letus', null, null,
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
const User = sequelize.define('User', {
  userid: { type: Sequelize.STRING, allowNull: false },
  pic: Sequelize.STRING,
  phonenumber: Sequelize.STRING,
  friendrank: Sequelize.STRING,
  lettuceleaves: Sequelize.STRING,
});

const UserFavorites = sequelize.define('UserFavorites', {
  userid: { type: Sequelize.STRING, allowNull: false },
  favoriteid: Sequelize.STRING,
});

const UserFriends = sequelize.define('UserFriends', {
  userid: { type: Sequelize.STRING, allowNull: false },
  friendid: Sequelize.STRING,
});

const CheckIns = sequelize.define('CheckIns', {
  attendee: Sequelize.STRING,
  eventid: Sequelize.STRING,
  checkedin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
});

const Events = sequelize.define('Events', {
  eventlord: { type: Sequelize.STRING, allowNull: false },
  yelpid: Sequelize.STRING,
  attendees: Sequelize.STRING,
});

const Favorites = sequelize.define('Favorites', {
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
