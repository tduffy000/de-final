'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('StudentCourses',
      [
        {
          courseID: 1,
          userID: 2,
          createdAt: now,
          updatedAt: now
        },{
          courseID: 2,
          userID: 2,
          createdAt: now,
          updatedAt: now
        },{
          courseID: 2,
          userID: 6,
          createdAt: now,
          updatedAt: now
        },{
          courseID: 3,
          userID: 6,
          createdAt: now,
          updatedAt: now
        },{
          courseID: 1,
          userID: 7,
          createdAt: now,
          updatedAt: now
        },{
          courseID: 2,
          userID: 7,
          createdAt: now,
          updatedAt: now
        },{
          courseID: 3,
          userID: 7,
          createdAt: now,
          updatedAt: now
        }
      ]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentCourses', null, {});
  }
};
