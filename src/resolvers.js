import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import db from "../models";
import jwt from "jsonwebtoken";

/**
 * USER LOGIN
 */

/**
* See https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
* generates random string of characters i.e salt
* @function
* @param {number} length - Length of the random string.
*/
const genRandomString = length => {
 return crypto
   .randomBytes(Math.ceil(length / 2))
   .toString('hex') /** convert to hexadecimal format */
   .slice(0, length); /** return required number of characters */
};

const sha512 = (password, salt) => {
 var hash = crypto.createHmac(
   'sha512',
   salt,
 ); /** Hashing algorithm sha512 */
 hash.update(password);
 var value = hash.digest('hex');
 return {
   salt: salt,
   passwordHash: value,
 };
};

const getUserForToken = token => {
  try {
    const { id, sessionID } = jwt.verify(token, APP_SECRET);
    const user = db.User.findByPk(id);
    console.log(user);
    // TODO: a better way to do this with a database is to
    // join the Users table with the UserSessions table on
    // users.id = user_sessions.user_id where session_id = sessionID
    // this would get both the user and the sessionID in one query
    const session = userSessions.getSession(sessionID);
    if (!session) {
      throw new AuthenticationError('Invalid Session');
    }

    return [user, session.id];
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // invalidate the session if expired
      const { sessionID } = jwt.decode(token);
      userSessions.invalidateSession(sessionID);
      throw new AuthenticationError('Session Expired');
    }
    throw new AuthenticationError('Bad Token');
  }
};

// TODO: make async (?)
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
/*
    if ( requireUser ) {
      const token = context.req.headers.authorization || "";
      if (!token) throw new AuthenticationError("Token required!");

      [user, sessionID] = getUserForToken(token);
      if (!user) throw new AuthenticationError("Invalid Token/User");

      const userRole = user.role;
      if (_.indexOf(roles, userRole) === -1) {
        throw new ForbiddenError("Operation not permitted for role: " + userRole);
      }
    }
*/
    return resolver(
        root,
        args,
        {...context, user: user, sessionID: sessionID, db: db},
        info
    );
  };
};

export default {
    // TODO: ensure permissions are appropriate (found in context by way of currentUser)
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
