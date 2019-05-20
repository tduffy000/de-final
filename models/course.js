"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    name: DataTypes.STRING,
    professorID: DataTypes.INTEGER
  }, {});
  Course.associate = function(models) {
    Course.belongsToMany(models.User, {
      through: models.StudentCourse,
      foreignKey: "courseID",
      as: "students"
    });
    Course.belongsTo(models.User, {
      foreignKey: "professorID",
      as: "professor"
    })
    Course.hasMany(models.Assignment, {
      foreignKey: "courseID",
      as: "assignments"
    });
  };
  return Course;
};
