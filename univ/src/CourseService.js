import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import ApoClient from "./ApolloClient";

class CourseService {
    static currInstance = null;

    static getInstance() {
        if (this.currInstance == null) {
            this.currInstance = new CourseService();
        }
        return this.currInstance;
    }

    addCourse = (id, name) => {
      console.log("Name",name,"ProfessorId",id);
      return ApoClient.mutate({
          mutation: gql`mutation createCourse($name: String!, $ProfessorID: ID!){
                 createCourse(name: $name, professorID: $ProfessorID) {
                          id  name  professor{
                                            name email
                                        }
                        }
                }
      `,
          variables: { name: name, ProfessorID: id }, }
      );
    };

    deleteCourse = (id) => {
      console.log("CourseId",id);
      return ApoClient.mutate({
          mutation: gql`mutation deleteCourse($CourseID: ID!){
                 deleteCourse(courseID: $CourseID) {
                          id name
                        }
                }
      `,
          variables: { CourseID: id } }
      );
    };

    updateCourse = (courseid,name,profid) => {
      console.log("CourseId",courseid,"Name:",name,"ProfessorId:",profid);
      return ApoClient.mutate({
          mutation: gql`mutation updateCourse($courseID: ID!,$name: String!,$professorID: ID!){
                  updateCourse(courseID: $courseID, name: $name, professorID: $professorID) {
                          id name professor{
                                            name email
                                        }
                        }
                }
      `,
          variables: { courseID: courseid, name: name, professorID: profid } }
      );
    };

    addStudentToCourse = (cid,sid) => {
      console.log("CourseId",cid,"StudentId",sid);
      return ApoClient.mutate({
          mutation: gql`mutation addStudentToCourse($userID: ID!, $courseID: ID!){
                  addStudentToCourse(userID: $userID, courseID: $courseID) {
                          id name
                        }
                }
      `,
          variables: { userID: sid, courseID: cid } }
      );
    };

    removeStudentFromCourse = (cid,sid) => {
      console.log("CourseId",cid,"StudentId",sid);
      return ApoClient.mutate({
          mutation: gql`mutation removeStudentFromCourse($userID: ID!, $courseID: ID!){
                  removeStudentFromCourse(userID: $userID, courseID: $courseID) {
                          id name
                        }
                }
      `,
          variables: { userID: sid, courseID: cid } }
      );
    };

    createAssignment = (id, name) => {
      console.log("CourseId",id,"Assignment",name);
      return ApoClient.mutate({
          mutation: gql`mutation createAssignment($courseID: ID!, $name: String!){
                  createAssignment(courseID: $courseID, name: $name) {
                          id name
                        }
                }
      `,
          variables: { courseID: id, name: name } }
      );

    };

    createAssignmentGrade = (aid,cid,sid,grade) => {
      console.log("AssignmentId",aid,"CourseId",cid,"StudentId",sid,"Grade",grade);
      return ApoClient.mutate({
          mutation: gql`mutation createAssignmentGrade($assignmentID: ID!, $courseID: ID!, $studentID: ID!, $grade: Float!){
                  createAssignmentGrade(assignmentID: $assignmentID, courseID: $courseID, studentID: $studentID, grade: $grade) {
                          id
                        }
                }
      `,
          variables: { assignmentID: aid, courseID: cid,  studentID: sid, grade: parseFloat(grade)} }
      );
    };
}

const myCourseService = CourseService.getInstance();
export default myCourseService;
