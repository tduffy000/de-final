"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    name: DataTypes.STRING,
    professorID: DataTypes.STRING
  }, {});
  Course.associate = function(models) {
    Course.belongsToMany(models.User, {
      through: models.StudentCourse,
      foreignKey: "courseID"
    });
    Course.hasMany(models.Assignment, {
      foreignKey: "courseID"
    })
  };
  return Course;
};
