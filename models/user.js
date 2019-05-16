// TODO: email uniqueness check
// TODO: how to make passwordHash secret?
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    first: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // TODO: how to handle bubbling up this exception (i.e. invalid e-mail)?
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
      foreignKey: "userID"
    });
    User.hasOne(models.UserSession, {
      foreignKey: "userID"
    })
  };
  return User;
};
