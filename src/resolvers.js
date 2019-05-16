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

    if ( requireUser ) {
      const token = context.req.headers.authorization || "";
      if (!token) throw new AuthenticationError("Token required!");

      [user, sessionID] = login_manager.getUserFromToken(token).catch((e) => {
        console.error(e);
      });

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
      currentUser: makeResolver( (root, args, context, info) => context.user),
      users: makeResolver((root, args, context, info) => {
        return context.db.User.findAll();
      }),
      students: makeResolver((root, args, context, info) => {
        return context.db.User.findAll({
          where: {role: "Student"}
        });
      }),
      faculty: makeResolver((root, args, context, info) => {
        return context.db.User.findAll({
          where: {role: "Professor"}
        });
      }),
      courses: makeResolver((root, args, context, info) => {
        return context.db.Course.findAll()
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
          return context.db.User.create({
            name: name,
            email: email,
            role: role
          })
        }
      ),
      updateUser: makeResolver(
        (root, { id, name, email, role }, context, info) => {
          return context.db.User.update({
            name: name,
            email: email,
            role: role
          },{
            where: {id: id}
          })
        }
      ),
      createCourse: makeResolver(
        (root, { name, professorID }, context, info) => {
          return context.db.Course.create({
            name: name,
            professorID: professorID
          })
        }
      ),
      deleteCourse: makeResolver(
        (root, { id }, context) => {
          return context.db.Course.destroy({
            where: {id: id}
          })
        }
      ),
      addStudentToCourse: makeResolver(
        (root, { courseID, userID }, context, info) => {
          return context.db.StudentCourse.findOrCreate({
            where: {
              courseID: courseID,
              userID: userID
            }
          })
        }
      ),
      removeStudentFromCourse: makeResolver(
        (root, { courseID, userID }, context, info) => {
          return context.db.StudentCourse.destroy({
            where: {
              courseID: courseID,
              userID: userID
            }
          })
        }
      ),
      createAssignment: makeResolver(
        (root, { name, courseID }, context, info) => {
          return context.db.Assignment.create({
            name: name,
            courseID: courseID
          })
        }
      ),
      createAssignmentGrade: makeResolver(
        (root, { assignmentID, studentID, courseID, grade }, context, info) => {
          return context.db.StudentAssignment.update({
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
      )
      // TODO: GPA can be calculated by a filter on Assignment grade table
    }
};
