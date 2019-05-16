"use strict";
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("Assignment", {
    name: DataTypes.STRING,
    courseID: DataTypes.INTEGER
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
