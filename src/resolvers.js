import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import regeneratorRuntime from "regenerator-runtime";

import db from "../models";
import Login from "./login.js";
import Users from "./user.js";
import Courses from "./course.js";
import Assignment from "./assignment.js";
var DB_TESTING_FLAG = true; // remove for production

/**
 * OBJECT CLASSES
 */
var login_manager = new Login( db );
var user_manager  = new Users( db );
var course_manager = new Courses( db );
var assignment_manager = new Assignment( db );

const makeResolver = (resolver, options) => {
  return async (root, args, context, info) => {
    const o = {
      requireUser: !DB_TESTING_FLAG,
      roles: ["Admin", "Student", "Professor"],
      ...options
    }
    const { requireUser } = o;
    const { roles } = o;
    let user = null;
    let sessionID = null;

    if ( requireUser ) {
      const token = context.req.headers.authorization || "";
      if (!token) throw new AuthenticationError("Token required!");

      [user, sessionID] = await login_manager.getUserFromToken(token);

      if (!user || !sessionID) throw new AuthenticationError("Invalid Token/User");
      const userRole = user.role;

      if (roles.indexOf(userRole) === -1) {
        throw new ForbiddenError("Operation Not Permitted");
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
export default {
    User: {
      __resolveType: (user, context, info) => user.role
    },
    Query: {
      currentUser: makeResolver((root, args, context, info) => context.user),
      users: makeResolver((root, args, context, info) => {
        return user_manager.getUsers();
      }),
      students: makeResolver((root, args, context, info) => {
        return user_manager.getStudents();
      }),
      faculty: makeResolver((root, args, context, info) => {
        return user_manager.getFaculty();
      }),
      courses: makeResolver((root, args, context, info) => {
        return course_manager.getCourses();
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
        (root, args, context, info) => {
          return login_manager.logoutUser( context.user );
        }
      ),
      createUser: makeResolver(
        (root, { user }, context, info) => {
          return user_manager.createUser( user );
        },
        {roles: ["Admin"]}
      ),
      updateUser: makeResolver(
        (root, { id, name, email, role }, context, info) => {
          return user_manager.updateUser( id, name, email, role );
        },
        {roles: ["Admin"]}
      ),
      createCourse: makeResolver(
        (root, { name, professorID }, context, info) => {
          return course_manager.createCourse( name, professorID );
        },
        {roles: ["Admin"]}
      ),
      deleteCourse: makeResolver(
        (root, { id }, context) => {
          return course_manager.deleteCourse( id );
        },
        {roles: ["Admin"]}
      ),
      updateCourse: makeResolver(
        (root, { courseID, name, professorID }, context, info) => {
          return course_manager.updateCourse( courseID, name, professorID );
        },
        {roles: ["Admin", "Professor"]}
      ),
      addStudentToCourse: makeResolver(
        (root, { userID, courseID }, context, info) => {
          return course_manager.addStudentToCourse( userID, courseID );
        },
        {roles: ["Admin", "Professor"]}
      ),
      removeStudentFromCourse: makeResolver(
        (root, { userID, courseID }, context, info) => {
          return course_manager.removeStudentFromCourse( userID, courseID );
        },
        {roles: ["Admin", "Professor"]}
      ),
      createAssignment: makeResolver(
        (root, { name, courseID }, context, info) => {
          return assignment_manager.createAssignment( name, courseID )
        },
        {roles: ["Professor"]}
      ),
      createAssignmentGrade: makeResolver(
        (root, { assignmentID, studentID, courseID, grade }, context, info) => {
          return assignment_manager.createAssignmentGrade(
            assignmentID, studentID, courseID, grade
          );
        },
        {roles: ["Professor"]}
      )
    }
};
