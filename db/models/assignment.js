// how to use many => one here given that we have foreignKey contained within table rn

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("Assignment", {
    assignmentName: DataTypes.STRING,
    courseID: DataTypes.STRING
  }, {});
  Assignment.associate = function(models) {
    // associations can be defined here
    Assignment.belongsTo(models.Course, {
      foreignKey: "assignmentID"
    });
    Assignment.belongsTo(models.User, {
      foreignKey: "assignmentID"
    })
  };
  return Assignment;
};
