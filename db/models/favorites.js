module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Favorites', {
    yelpid: DataTypes.STRING,
  });
};
