"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    courseName: DataTypes.STRING,
    professorID: DataTypes.STRING
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
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
