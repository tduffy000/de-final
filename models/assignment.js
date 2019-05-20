"use strict";
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("Assignment", {
    name: DataTypes.STRING,
    courseID: DataTypes.INTEGER
  }, {});
  Assignment.associate = function(models) {
    Assignment.belongsToMany(models.User, {
      through: models.StudentAssignment,
      foreignKey: "assignmentID",
      as: "assignments"
    });
  };
  return Assignment;
};
