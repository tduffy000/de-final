const models = require("../models");

// fetch a user
models.User.findOne().then( r => u = r );

// update a user

// create a user
models.User.create({firstName: 'testman',
                    lastName: 'Johnson',
                    email: 'test@gmail.com',
                    role: 'Student'
                  });

// fetch a course

// fetch the enrolled students in that course
