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
          grade: "A",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 2,
          userID: 2,
          courseID: 1,
          grade: "B",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 3,
          userID: 2,
          courseID: 1,
          grade: "B+",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 4,
          userID: 2,
          courseID: 2,
          grade: "B-",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 5,
          userID: 2,
          courseID: 2,
          grade: "A-",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 4,
          userID: 6,
          courseID: 2,
          grade: "C-",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 5,
          userID: 6,
          courseID: 2,
          grade: "C+",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 6,
          userID: 6,
          courseID: 3,
          grade: "B-",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 1,
          userID: 7,
          courseID: 1,
          grade: "A+",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 2,
          userID: 7,
          courseID: 1,
          grade: "A",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 3,
          userID: 7,
          courseID: 1,
          grade: "A",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 4,
          userID: 7,
          courseID: 2,
          grade: "A",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 5,
          userID: 7,
          courseID: 2,
          grade: "C",
          createdAt: now,
          updatedAt: now
        },{
          assignmentID: 6,
          userID: 7,
          courseID: 3,
          grade: "A+",
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
