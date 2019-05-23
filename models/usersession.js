'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSession = sequelize.define('UserSession', {
    userID: DataTypes.INTEGER
  }, {});
  UserSession.associate = function(models) {
    // associations can be defined here
    UserSession.belongsTo(models.User, {
        foreignKey: "userID",
        as: "session"
    })
  };
  return UserSession;
};
