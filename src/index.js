// Library Imports
import { ApolloServer,
        gql,
        ForbiddenError,
        AuthenticationError } from "apollo-server";
import _ from "lodash";
import resolvers from "./resolvers";
import db from "../models";

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
    updateCourse(courseID: ID!, name: String!, professorID: ID!): Course
    addStudentToCourse( userID: ID!, courseID: ID!): Course
    removeStudentFromCourse(userID: ID!, courseID: ID!): Course

    createAssignment(courseID: ID!, name: String!): Assignment
    createAssignmentGrade(
      assignmentID: ID!
      courseID: ID!
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
    name: String!
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
    name: String!
    email: String!
    role: Role!
    passwordHash: String!
  }

  type Student implements User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    passwordHash: String!
    courses: [Course]
    assignments: [Assignment]
    gpa: Float!
  }

  type Professor implements User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    passwordHash: String!
    teaching: [Course]
  }

  type Admin implements User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    passwordHash: String!
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
