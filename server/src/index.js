// Library Imports
import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import _ from "lodash";

// Classes
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
      users.create({ user })
    },
    updateUser: (root, id, { user }, context) => {
      users.update(id, { user })
    },
    createCourse: (root, args, context) => {
      let prof = users.getProfessor( args.facultyID )
      courses.create( args.name, prof )
    },
    deleteCourse: (root, args, context) => {
      courses.delete( args.courseID )
    },
    addStudentToCourse: (roots, args, context) => {
      let student = users.getStudent( args.studentID )
      courses.addStudent( args.courseID, student )
    },
    removeStudentFromCourse: (roots, args, context) => {
      let student = users.getStudent( args.studentID )
      courses.removeStudent( args.courseID, student )
    },
    createAssignment: (roots, args, context) => {
      let course = courses.get( args.courseID )
      assignments.create( args.name, course )
    },
    createAssignmentGrade: (roots, args, context) => {
      let student = users.getStudent( args.studentID )
      assignments.createGrade( args.assignmentID, student, args.grade )
    }
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
