// Library Imports
import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import _ from "lodash";
import resolvers from "./resolvers";
import db from "../../db/models";

const APP_SECRET = "App Secret Key ; For example only! Don't define one in code!!!";

const makeResolver = (resolver, options) => {
  return (root, args, context, info) => {
    const o = {
      requireUser: true,
      roles: ["Admin", "Student", "Faculty"],
      ...options
    }
    const { requireUser } = o;
    const { roles } = o;
    let user = null;
    let sessionID = null;

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

    return resolver(
        root,
        args,
        {...context, user: user, sessionID: sessionID, db: db},
        info
    );
  };
};

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    users: [User]
    students: [Student]
    faculty: [Faculty]
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
    createCourse(name: String!, facultyID: ID!): Course
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
    # First and last name
    name: String!
    email: String!
    role: Role
    password: String
  }

  enum Role {
    Admin
    Student
    Faculty
  }

  interface User {
    id: ID!
    name: String!
    email: String!
    role: Role!
  }

  type Student implements User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    courses: [Course]
    assignments: [Assignment]
    gpa: Float!
  }

  type Faculty implements User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    courses: [Course]
  }

  type Admin implements User {
    id: ID!
    name: String!
    email: String!
    role: Role!
  }

  type Course {
    id: ID!
    name: String!
    professor: Faculty
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

const getUserForToken = token => {
  try {
    const { id, sessionID } = jwt.verify(token, APP_SECRET);
    const user = db.user.findById(id);

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return request;
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
