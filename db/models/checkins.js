module.exports = function (sequelize, DataTypes) {
  return sequelize.define('CheckIns', {
    attendee: DataTypes.STRING,
    eventid: DataTypes.STRING,
    checkedin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  });
};
