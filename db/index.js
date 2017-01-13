const mongoose = require('mongoose');

const mongoUri = process.env.NODE_ENV === 'production' ? 'mongodb://database/docker' : 'mongodb://localhost/letus';


mongoose.connect(mongoUri);

// Connect Mongoose to our local MongoDB via URI specified above and export it below
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB Connected!');
});

module.exports = db;
