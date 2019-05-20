"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordHash:{
      type: DataTypes.STRING,
      allowNull: false
    },
    salt:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Course, {
      through: models.StudentCourse,
      foreignKey: "userID",
      as: "courses"
    });
    User.hasMany(models.Course, {
      foreignKey: "professorID",
      as: "teaching"
    });
    User.belongsToMany(models.Assignment, {
      through: models.StudentAssignment,
      foreignKey: "userID",
      as: "assignments"
    });
    User.hasOne(models.UserSession, {
      foreignKey: "userID"
    })
  };
  return User;
};
