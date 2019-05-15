'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Assignments',
      [
        {
          name: "Completeness",
          courseID: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          name: "Complexity",
          courseID: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          name: "Sodering",
          courseID: 2,
          createdAt: now,
          updatedAt: now
        }
      ]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Assignments', null, {});
  }
};
