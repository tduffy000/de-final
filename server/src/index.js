// Library Imports
import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import _ from "lodash";

// Database models
const models = require("../../db/models");

// Classe files
import Users from "./users.js";
import UserSessions from "./user_sessions.js";
import Courses from "./courses.js";
import Assignments from "./assignments.js";

const APP_SECRET = "App Secret Key ; For example only! Don't define one in code!!!";

// Construct a schema, using GraphQL schema language
// TODO: consider that the database should handle the ID's to maintain uniqueness
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

var users = new Users();
var userSessions = new UserSessions();
var courses = new Courses();
var assignments = new Assignments();

const resolvers = {
  // can't you just use __resolveType => obj.role ?
  User: {
    __resolveType(obj, context, info) {
      switch ( obj.role ) {
        case "Student":
          return "Student";
        case "Admin":
          return "Admin";
        case "Faculty":
          return "Faculty";
      }
    }
  },
  Query: {
    users: (root, args, context) => users.getUsers(),
    students: (root, args, context, info) => users.getStudents(),
    faculty: (root, args, context, info) => users.getFaculty(),
    courses: (root, args, context, info) => courses.getCourses()
  },
  Mutation: {
    createUser: (root, { user }, context) => {
      // TODO: check if user is admin
      users.create({ user })
    },
    updateUser: (root, id, { user }, context) => {
      // TODO: check if user is admin
      users.update(id, { user })
    },
    createCourse: (root, args, context) => {
      // TODO: check if user is faculty
      let prof = users.getProfessor( args.facultyID )
      courses.create( args.name, prof )
    },
    deleteCourse: (root, args, context) => {
      // TODO: check if user is faculty
      courses.delete( args.courseID )
    },
    addStudentToCourse: (roots, args, context) => {
      // TODO: check if user is faculty
      let student = users.getStudent( args.studentID )
      courses.addStudent( args.courseID, student )
    },
    removeStudentFromCourse: (roots, args, context) => {
      // TODO: check if user is faculty
      let student = users.getStudent( args.studentID )
      courses.removeStudent( args.courseID, student )
    },
    createAssignment: (roots, args, context) => {
      // TODO: check if user is faculty
      let course = courses.get( args.courseID )
      assignments.create( args.name, course )
    },
    createAssignmentGrade: (roots, args, context) => {
      // TODO: check if user is faculty
      let student = users.getStudent( args.studentID )
      assignments.createGrade( args.assignmentID, student, args.grade )
    }
  }
};

const getUserForToken = token => {
  try {
    const { id, sessionID } = jwt.verify(token, APP_SECRET);
    const user = users.get(id);

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
      // invalidate the sesssion if expired
      const { sessionID } = jwt.decode(token);
      userSessions.invalidateSession(sessionID);
      throw new AuthenticationError('Session Expired');
    }
    throw new AuthenticationError('Bad Token');
  }
};

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
    let sessionId = null;

    if ( requireUser ) {
      const token = context.req.headers.authorization || "";
      if (!token) throw new AuthenticationError("Token required!");

      [user, sessionId] = getUserForToken(token);
      if (!user) throw new AuthenticationError("Invalid Token/User");

      const userRole = user.role;
      if (_.indexOf(roles, userRole) === -1) {
        throw new ForbiddenError("Operation not permitted for role: " + userRole);
      }
    }

    return resolver(
        root,
        args,
        { ...context, user: user, sessionId: sessionId, db: db},
        info
    );
  };
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
