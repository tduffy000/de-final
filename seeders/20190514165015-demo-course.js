'use strict';

// TODO: need to ensure that professorID maps to a professor
module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Courses',
      [
        {
          name: "Theory of Computation",
          professorID: 1,
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
