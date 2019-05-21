'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('StudentAssignments',
      [
        {
          assignmentID: 1,
          userID: 2,
          courseID: 1,
          grade: null,
          createdAt: now,
          updatedAt: now
        }
      ]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentAssignments', null, {});
  }
};
