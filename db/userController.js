var tables = require('./database.js');

var usertable = tables.User.build({
  userid: 'john',
});
// Inserting Data into database
usertable.save().then(function(err) {
  console.log('It worked');
})
.catch(function(err) {
  console.log(err);
});

tables.User.sync();


// tables.User
//   .find({ where: { userid: 'john' } })
//   .then(function(err, johnDoe) {
//     if (!johnDoe) {
//       console.log('No user with the username "john-doe" has been found.');
//     } else {
//       console.log('Hello ' + johnDoe.username + '!');
//       console.log('All attributes of john:', johnDoe.get());
//     }
//   });
