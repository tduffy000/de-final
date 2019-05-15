// Library Imports
import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import _ from "lodash";
import resolvers from "./resolvers";
import db from "../models";

const APP_SECRET = "App Secret Key ; For example only! Don't define one in code!!!";

/**
  * SCHEMA
  */
const typeDefs = gql`
  type Query {
    users: [User]
    students: [Student]
    faculty: [Professor]
    currentUser: User
    courses: [Course]
  }

  type Mutation {
    loginUser(email: String!, password: String!): AuthPayload
    logoutUser: Boolean

    # Only Admin can create/update users
    createUser(user: UserInput): User
    updateUser(id: ID!, user: UserInput): User

    # Only Faculty can create/update and manage courses
    createCourse(name: String!, professorID: ID!): Course
    deleteCourse(courseID: ID!): Course
    addStudentToCourse(courseID: ID!, studentID: ID!): Course
    removeStudentFromCourse(courseID: ID!, studentID: ID!): Course

    createAssignment(courseID: ID!, name: String!): Assignment
    createAssignmentGrade(
      assignmentID: ID!
      studentID: ID!
      grade: Float!
    ): AssignmentGrade
  }

  # extra credit: monitor when assignments are add
  type Subscription {
    assignmentAdded(studentID: ID!): Assignment
  }

  type AuthPayload {
    token: String
    user: User
  }

  input UserInput {
    first: String!
    last: String!
    email: String!
    role: Role
    password: String
  }

  enum Role {
    Admin
    Student
    Professor
  }

  interface User {
    id: ID!
    first: String!
    last: String!
    email: String!
    role: Role!
  }

  type Student implements User {
    id: ID!
    first: String!
    last: String!
    email: String!
    role: Role!
    courses: [Course]
    assignments: [Assignment]
    gpa: Float!
  }

  type Professor implements User {
    id: ID!
    first: String!
    last: String!
    email: String!
    role: Role!
    courses: [Course]
  }

  type Admin implements User {
    id: ID!
    first: String!
    last: String!
    email: String!
    role: Role!
  }

  type Course {
    id: ID!
    name: String!
    professor: Professor
    students: [Student]
    assignments: [Assignment]
  }

  type Assignment {
    id: ID!
    name: String!
    course: Course!
    grades: [AssignmentGrade]
  }

  type AssignmentGrade {
    id: ID!
    assignment: Assignment
    student: User
    grade: String!
  }
`;

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

/**
 * SERVER
 */
const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  context: request => {
    return request;
  },
    introspection: true,
    playground: true
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
