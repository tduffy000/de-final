"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Course, {
      through: models.StudentCourse,
      foreignKey: "userID"
    });
    User.hasMany(models.Assignment, {
      through: models.StudentAssignment,
      foreignKey: "userID"
    });
    User.hasOne(models.UserSession, {
      foreignKey: "userID"
    })
  };
  return User;
};
