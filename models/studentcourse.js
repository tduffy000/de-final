'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('StudentCourse', {
    userID: DataTypes.INTEGER,
    courseID: DataTypes.INTEGER
  }, {});
  StudentCourse.associate = function(models) {
    // associations can be defined here
  };
  return StudentCourse;
};
