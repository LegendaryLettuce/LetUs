module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Events', {
    eventlord: { type: DataTypes.STRING, allowNull: false },
    yelpid: DataTypes.STRING,
    attendees: DataTypes.STRING,
  });
};
