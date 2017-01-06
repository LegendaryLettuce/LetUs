const {
  addUser,
  addFriend,
  addUserFavorites,
  addCheckIn,
  addEvent,
  findUser,
  getAllUsers,
} = require('./userController');

// addUser({
//   userid: 'Autumn',
//   pic: 'http://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-250.jpg',
//   phonenumber: '205-555-5555',
//   friendrank: 100,
//   lettuceleaves: 0,
// });

console.log(findUser('Autumn'));

console.log(getAllUsers());
