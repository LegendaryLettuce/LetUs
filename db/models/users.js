module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    userid: { type: DataTypes.STRING, allowNull: false },
    pic: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    friendrank: DataTypes.STRING,
    lettuceleaves: DataTypes.STRING,
  });
};
