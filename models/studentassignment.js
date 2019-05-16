// TODO: should remove the name field here
'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentAssignment = sequelize.define('StudentAssignment', {
    assignmentID: DataTypes.INTEGER,
    studentID: DataTypes.INTEGER,
    courseID: DataTypes.INTEGER,
    grade: DataTypes.STRING
  }, {});
  StudentAssignment.associate = function(models) {
    // associations can be defined here
  };
  return StudentAssignment;
};
