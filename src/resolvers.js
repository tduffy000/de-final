import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import db from "../models";
import Login from "./login.js";
import regeneratorRuntime from "regenerator-runtime";

/**
 * OBJECT CLASSES
 */
var login_manager = new Login();
// TODO: add wrapper classes for User, Course, Assignment

const makeResolver = (resolver, options) => {
  return async (root, args, context, info) => {
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

      // TODO: how can we throw these so they get caught by the test suite?
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
// TODO: confirm resolver permissions
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
        (root, { user }, context, info) => {
          var passwordData = login_manager.genSaltHashPassword( user.password );
          return context.db.User.create({
            name: user.name,
            email: user.email,
            role: user.role,
            passwordHash: passwordData.passwordHash,
            salt: passwordData.salt
          })
        },
        {roles: ["Admin"]}
      ),
      updateUser: makeResolver(
        (root, { user }, context, info) => {
          return context.db.User.update({
            name: user.name,
            email: user.email,
            role: user.role
          },{
            where: {id: id}
          })
        },
        {roles: ["Admin"]}
      ),
      createCourse: makeResolver(
        (root, { name, professorID }, context, info) => {
          return context.db.Course.create({
            name: name,
            professorID: professorID
          })
        },
        {roles: ["Admin", "Professor"]}
      ),
      deleteCourse: makeResolver(
        (root, { id }, context) => {
          return context.db.Course.destroy({
            where: {id: id}
          })
        },
        {roles: ["Admin", "Professor"]}
      ),
      addStudentToCourse: makeResolver(
        (root, { courseID, userID }, context, info) => {
          return context.db.StudentCourse.findOrCreate({
            where: {
              courseID: courseID,
              userID: userID
            }
          })
        },
        {roles: ["Admin", "Professor"]}
      ),
      removeStudentFromCourse: makeResolver(
        (root, { courseID, userID }, context, info) => {
          return context.db.StudentCourse.destroy({
            where: {
              courseID: courseID,
              userID: userID
            }
          })
        },
        {roles: ["Admin", "Professor"]}
      ),
      createAssignment: makeResolver(
        (root, { name, courseID }, context, info) => {
          return context.db.Assignment.create({
            name: name,
            courseID: courseID
          })
        },
        {roles: ["Professor"]}
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
        },
        {roles: ["Professor"]}
      )
      // TODO: GPA can be calculated by a filter on Assignment grade table
    }
};
