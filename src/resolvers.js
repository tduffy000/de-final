import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import db from "../models";
import Login from "./login.js";

/**
 * OBJECT CLASSES
 */
var login_manager = new Login();
// TODO: add wrapper classes for User, Course, Assignment

const makeResolver = (resolver, options) => {
  return (root, args, context, info) => {
    const o = {
      requireUser: true,
      roles: ["Admin", "Student", "Professor"],
      ...options
    }
    const { requireUser } = o;
    const { roles } = o;
    let user = null;
    let sessionID = null;

    // TODO: handle errors thrown by getUserFromToken()
    if ( requireUser ) {
      const token = context.req.headers.authorization || "";
      if (!token) throw new AuthenticationError("Token required!");

      [user, sessionID] = login_manager.getUserFromToken(token);

      if (!user || !sessionID) throw new AuthenticationError("Invalid Token/User");
      const userRole = user.role;
      if (_.indexOf(roles, userRole) === -1) {
        throw new ForbiddenError("Operation not permitted for role: " + userRole);
      }
    }

    return resolver(
        root,
        args,
        {...context, user: user, sessionID: sessionID, db: db},
        info
    );
  };
};

/**
  * GRAPHQL RESOLVERS
  */
// TODO: loginUser needs to update user in context
export default {
    User: {
      __resolveType: (user, context, info) => user.role
    },
    Query: {
      currentUser: makeResolver( (root, args, { db, user }, info) => user),
      users: makeResolver((root, args, { db }, info) => {
        return db.User.findAll();
      }),
      students: makeResolver((root, args, { db }, info) => {
        return db.User.findAll({
          where: {role: "Student"}
        });
      }),
      faculty: makeResolver((root, args, { db }, info) => {
        return db.User.findAll({
          where: {role: "Professor"}
        });
      }),
      courses: makeResolver((root, args, { db }, info) => {
        return db.Course.findAll()
      })
    },
    Mutation: {
      loginUser: makeResolver(
        (root, { email, password }, context, info) => {
          return login_manager.loginUser( email, password );
        },
        {requireUser: false}
      ),
      logoutUser: makeResolver(
        (root, args, { user }, info) => {
          return login_manager.logoutUser( user );
        }
      ),
      createUser: (root, { first, last, email, role }, { db }, info) => {
        db.User.create({
          first: first,
          last: last,
          email: email,
          role: role
        })
      },
      updateUser: (root, { id, first, last, email, role }, { db }, info) => {
        db.User.update({
          first: first,
          last: last,
          email: email,
          role: role
        },{
          where: {id: id}
        })
      },
      createCourse: (root, { name, professorID }, { db }, info) => {
        db.Course.create({
          name: name,
          professorID: professorID
        })
      },
      deleteCourse: (root, { id }, context) => {
        db.Course.destroy({
          where: {id: id}
        })
      },
      addStudentToCourse: (root, { courseID, userID }, { db }, context) => {
        // StudentCourse table
        db.StudentCourse.findOrCreate({
          where: {
            courseID: courseID,
            userID: userID
          }
        })
      },
      removeStudentFromCourse: (root, { courseID, userID }, { db }, info) => {
        // StudentCourse table
        db.StudentCourse.destroy({
          where: {
            courseID: courseID,
            userID: userID
          }
        })
      },
      createAssignment: (root, { name, courseID }, context, info) => {
        db.Assignment.create({
          name: name,
          courseID: courseID
        })
      },
      createAssignmentGrade: (root, { assignmentID, studentID, courseID, grade }, { db }, info) => {
        // AssignmentGrade table
        db.StudentAssignment.update({
          assignmentID: assignmentID,
          studentID: studentID,
          courseID: courseID,
          grade: grade
        },{
          where: {
            studentID: studentID,
            courseID: courseID
          }
        })
      }
      // TODO: GPA can be calculated by a filter on Assignment grade table
    }
};
