export default {
    // TODO: ensure permissions are appropriate
    User: {
      __resolveType: (user, context, info) => user.role
    },
    Query: {
      currentUser: makeResolver( (root, args, context, { db }, info) => context.user),
      users: makeResolver((root, args, context, { db }, info) => {
        db.user.findAll()
      }),
      students: makeResolver((root, args, context, { db } info) => {
        db.user.findAll({
          where: {role: "Student"}
        })
      }),
      faculty: makeResolver((root, args, context, { db }, info) => {
        db.user.findAll({
          where: {role: "Professor"}
        })
      }),
      courses: makeResolver((root, args, context, { db }, info) => {
        db.course.findAll()
      })
    },
    Mutation: {
      loginUser: makeResolver(
        (root, args, context, info) => {
          return users.login(args.email, args.password);
        },
        {requireUser: false}
      ),
      logoutUser: makeResolver(
        (root, args, context, info) => {
          const sessionID = context.sessionID;
          userSessions.invalidateSession(sessionID);
          return true;
        }
      ),
      createUser: (root, { first, last, email, role }, { db }, context) => {
        db.user.create({
          firstName: first,
          lastName: last,
          email: email,
          role: role
        })
      },
      updateUser: (root, { id }, { first, last, email, role }, { db }, context) => {
        db.user.update({
          firstName: first,
          lastName: last,
          email: email,
          role: role
        },{
          where: {id: id}
        })
      },
      createCourse: (root, { courseName, professorID }, { db }, context) => {
        db.course.create({
          courseName: courseName,
          professorID: professorID
        })
      },
      deleteCourse: (root, { id }, context) => {
        db.course.destroy({
          where: {id: id}
        })
      },
      addStudentToCourse: (roots, args, context) => {
        // StudentCourse table
      },
      removeStudentFromCourse: (roots, args, context) => {
        // StudentCourse table
      },
      createAssignment: (roots, {assignmentName, courseID}, context) => {
        db.assignment.create({
          assignmentName: assignmentName,
          courseID: courseID
        })
      },
      createAssignmentGrade: (roots, args, context) => {
        // AssignmentGrade table
      }
    }
};
