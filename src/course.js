import { ForbiddenError,
         AuthenticationError } from "apollo-server";



export default class Courses {
  constructor(db) {
    this.course = db.Course,
    this.studentCourse = db.StudentCourse
  }

  getCourses() {
    return this.course.findAll().then((r) => {
      return JSON.parse(JSON.stringify(r))
    })
  }

  createCourse(name, professorID) {
    return this.course.create({
      name: name,
      professorID: professorID
    })
  }

  deleteCourse(id) {
    return this.course.destroy({
      where: {id: id}
    })
  }

  addStudentToCourse(courseID, userID) {
    return this.studentCourse.findOrCreate({
      where: {
        courseID: courseID,
        userID: userID
      }
    })
  }

  removeStudentFromCourse(courseID, userID) {
    return this.studentCourse.destroy({
      where: {
        courseID: courseID,
        userID: userID
      }
    })
  }

}
