// TODO: should remove the name field here
'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentAssignment = sequelize.define('StudentAssignment', {
    assignmentID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    courseID: DataTypes.INTEGER,
    grade: DataTypes.STRING
  }, {});
  StudentAssignment.associate = function(models) {
    StudentAssignment.belongsTo(models.User, {
      foreignKey: "userID"
    });
  };
  return StudentAssignment;
};
