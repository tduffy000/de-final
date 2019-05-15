'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Users',
	   [
       {
         first: 'Alan',
         last: 'Turing',
		     email: 'poison-apple@google.co.uk',
		     role: 'Professor',
         passwordHash: 'abcd',
         createdAt: now,
		     updatedAt: now
	      },
	      {
         first: 'Tyrone',
		     last: 'Slopthrop',
		     email: 'tyslop@thezone.com',
		     role: 'Student',
         passwordHash: 'abcd',
		     createdAt: now,
		     updatedAt: now
	      },
	      {
  	     first: 'Roger',
  	     last: 'Mexico',
  	     email: 'roger@whitevisitation.gov',
  	     role: 'Admin',
         passwordHash: 'abcd',
  	     createdAt: now,
  	     updatedAt:now
        },
	    ],
	    {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
