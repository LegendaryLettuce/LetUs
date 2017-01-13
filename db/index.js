const mongoose = require('mongoose');

// const mongoUri = 'mongodb://localhost/letus';
const mongoUri = 'mongodb://database/docker';


mongoose.connect(mongoUri);

// Connect Mongoose to our local MongoDB via URI specified above and export it below
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB Connected!');
});

module.exports = db;
