'use strict';

// if salt = 'fff0718ca599b0a9'
// then
// hash('password') = 85049421b741244d37d7688ff85e24d66e819647b119cf2aaae55426692aeb46e12601aff4cd60591407a439863ed1d77048dddea5e66d5d2b0fb562f6b92d64
// used as a test for all users
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
         passwordHash: '85049421b741244d37d7688ff85e24d66e819647b119cf2aaae55426692aeb46e12601aff4cd60591407a439863ed1d77048dddea5e66d5d2b0fb562f6b92d64',
         salt: 'fff0718ca599b0a9',
         createdAt: now,
		     updatedAt: now
	      },
	      {
         first: 'Tyrone',
		     last: 'Slopthrop',
		     email: 'tyslop@thezone.com',
		     role: 'Student',
         passwordHash: '85049421b741244d37d7688ff85e24d66e819647b119cf2aaae55426692aeb46e12601aff4cd60591407a439863ed1d77048dddea5e66d5d2b0fb562f6b92d64',
         salt: 'fff0718ca599b0a9',
         createdAt: now,
		     updatedAt: now
	      },
	      {
  	     first: 'Roger',
  	     last: 'Mexico',
  	     email: 'roger@whitevisitation.gov',
  	     role: 'Admin',
         passwordHash: '85049421b741244d37d7688ff85e24d66e819647b119cf2aaae55426692aeb46e12601aff4cd60591407a439863ed1d77048dddea5e66d5d2b0fb562f6b92d64',
         salt: 'fff0718ca599b0a9',
         createdAt: now,
  	     updatedAt: now
        },
        {
         first: 'Charles',
         last: 'Babbage',
         email: 'charlie@cambridge.edu',
         role: 'Professor',
         passwordHash: '85049421b741244d37d7688ff85e24d66e819647b119cf2aaae55426692aeb46e12601aff4cd60591407a439863ed1d77048dddea5e66d5d2b0fb562f6b92d64',
         salt: 'fff0718ca599b0a9',
         createdAt: now,
         updatedAt: now
        },
        {
         first: 'Vaslav',
         last: 'Tchitcherine',
         email: 'vassy@spetsnaz.ru',
         role: 'Admin',
         passwordHash: '85049421b741244d37d7688ff85e24d66e819647b119cf2aaae55426692aeb46e12601aff4cd60591407a439863ed1d77048dddea5e66d5d2b0fb562f6b92d64',
         salt: 'fff0718ca599b0a9',
         createdAt: now,
         updatedAt: now
       },
       {
         first: 'Margherita',
         last: 'Erdmann',
         email: 'paingal@gmail.com',
         role: 'Student',
         passwordHash: '85049421b741244d37d7688ff85e24d66e819647b119cf2aaae55426692aeb46e12601aff4cd60591407a439863ed1d77048dddea5e66d5d2b0fb562f6b92d64',
         salt: 'fff0718ca599b0a9',
         createdAt: now,
         updatedAt: now
       }
	    ],
	    {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
