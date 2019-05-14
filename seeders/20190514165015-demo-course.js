'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // TODO: change to 1
    const now = new Date();
    return queryInterface.bulkInsert('Courses',
      [
        {
          courseName: "Theory of Computation",
          professorID: 19,
          createdAt: now,
          updatedAt: now
        }
      ]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
