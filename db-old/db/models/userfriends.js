module.exports = function (sequelize, DataTypes) {
  return sequelize.define('UserFriends', {
    userid: { type: DataTypes.STRING, allowNull: false },
    friendid: DataTypes.STRING,
  });
};
