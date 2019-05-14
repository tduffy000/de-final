// TODO: should remove the name field here
'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentAssignment = sequelize.define('StudentAssignment', {
    name: DataTypes.STRING,
    assignmentID: DataTypes.STRING,
    studentID: DataTypes.STRING,
    courseID: DataTypes.STRING,
    grade: DataTypes.STRING
  }, {});
  StudentAssignment.associate = function(models) {
    // associations can be defined here
  };
  return StudentAssignment;
};
