import { ForbiddenError,
         AuthenticationError } from "apollo-server";



export default class Assignment {
  constructor(db) {
    this.assingment = db.Assignment,
    this.grade = db.AssignmentGrade
  }

  createAssingment(name, courseID) {
    return this.assingment.create({
      name: name,
      courseID: courseID
    });
  }

  removeAssingment(name, courseID) {
    return this.assingment.destroy({
      name: name,
      courseID: courseID
    });
  }

  createAssignmentGrade(assignmentID, studentID, courseID, grade) {
    return this.grade.update({
      grade: grade
    },{
      where: {
        assignmentID: assignmentID,
        studentID: studentID,
        courseID: courseID
      }
    })
  }

}
