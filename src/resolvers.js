import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import db from "../models";
import Login from "./login.js";
import Users from "./user.js"
import Courses from "./course.js"
import Assignment from "./assignment.js"

/**
 * OBJECT CLASSES
 */
var login_manager = new Login();
var user_manager  = new Users(db);
var course_manager = new Courses(db);
var assingment_manager = new Assignment(db)
// TODO: add wrapper classes for User, Course, Assignment

const makeResolver = (resolver, options) => {
  return async (root, args, context, info) => {
    const o = {
      requireUser: false,
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

      [user, sessionID] = await login_manager.getUserFromToken(token)
                                             .then((r) => {
                                               return r;
                                             }).catch((e) => {
                                               console.error(e);
                                             });

      if (!user || !sessionID) throw new AuthenticationError("Invalid Token/User");
      const userRole = user.role;

      //  THIS STUB REMOVED FOR TEST SUITE : for role: " + userRole
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
// TODO: loginUser needs to update user in context
// TODO: confirm resolver permissions
export default {
    User: {
      __resolveType: (user, context, info) => user.role
    },
    Query: {
      currentUser: makeResolver( (root, args, context, info) => context.user),
      users: makeResolver((root, args, context, info) => {
        return user_manager.getUsers();
      }),
      students: makeResolver((root, args, context, info) => {
        return user_manager.getRole("Student");
      }),
      faculty: makeResolver((root, args, context, info) => {
        return user_manager.getRole("Professor")

      }),
      courses: makeResolver((root, args, context, info) => {
        return course_manager.getCourses()
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
        (root, { name, email, role }, context, info) => {
          return user_manager.createUser(name, email, role),
          {roles: ["Admin"]}
        }
      ),
      updateUser: makeResolver(
        (root, { id, name, email, role }, context, info) => {
          return user_manager.updateUser(name, email, role, id)
        },
          {roles: ["Admin"]}
      ),
      createCourse: makeResolver(
        (root, { name, professorID }, context, info) => {
          return course_manager.createCourse(name, professorID)
        },
          {roles: ["Admin", "Professor"]};
      ),
      deleteCourse: makeResolver(
        (root, { id }, context) => {
          return course_manager.db.Course.destroy({
            where: {id: id}
          })
        },
        {roles: ["Admin", "Professor"]}
      ),
      addStudentToCourse: makeResolver(
        (root, { courseID, userID }, context, info) => {
          return course_manager.addStudentToCourse(courseID, userID)
        },
        {roles: ["Admin", "Professor"]}
      ),
      removeStudentFromCourse: makeResolver(
        (root, { courseID, userID }, context, info) => {
          return course_manager.removeStudentFromCourse(courseID, userID)
        },
        {roles: ["Admin", "Professor"]}
      ),
      createAssignment: makeResolver(
        (root, { name, courseID }, context, info) => {
          return assingment_manager.createAssingment(name, courseID)
        },
        {roles: ["Professor"]}
      ),
      removeAssignment: makeResolver(
        (root, { name, courseID }, context, info) => {
          return assingment_manager.removeAssingment(name, courseID)
        },
        {roles: ["Professor"]}
      ),
      createAssignmentGrade: makeResolver(
        (root, { assignmentID, studentID, courseID, grade }, context, info) => {
          return assingment_manager.createAssignmentGrade(assignmentID,
            studentID, courseID, grade)
        },
        {roles: ["Professor"]}
      )
      // TODO: GPA can be calculated by a filter on Assignment grade table
    }
};
