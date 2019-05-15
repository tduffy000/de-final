'use strict';

// TODO: need to ensure that professorID maps to a professor
module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Courses',
      [
        {
          name: "Computation",
          professorID: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          name: "Cryptography",
          professorID: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          name: "Analytical Engines",
          professorID: 4,
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
