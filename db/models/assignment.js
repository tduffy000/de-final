"use strict";
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("Assignment", {
    assignmentName: DataTypes.STRING,
    courseID: DataTypes.STRING
  }, {});
  Assignment.associate = function(models) {
    Assignment.belongsTo(models.Course, {
      foreignKey: "assignmentID"
    });
    Assignment.belongsToMany(models.User, {
      through: models.StudentAssignment,
      foreignKey: "assignmentID"
    });
  };
  return Assignment;
};
