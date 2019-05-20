
export default class Courses {

  constructor( db ) {
    this.DB = db;
  };

  // TODO
  getCourseById( id ) {
    return null;
  };

  getCourses() {
    return this.DB.Course.findAll().then((r) => {
      return JSON.parse(JSON.stringify(r))
    })
  };

  createCourse( name, professorID ) {
    return this.DB.Course.create({
      name: name,
      professorID: professorID
    })
  };

  deleteCourse( id ) {
    return this.DB.Course.destroy({
      where: {id: id}
    })
  };

  // TODO: do we need this?
  updateCourse( courseID, name, professorID ) {
    return this.DB.Course.update({
      professorID: professorID,
      name: name,
      where: {id: courseID}
    })
  };

  // TODO: check this
  addStudentToCourse( courseID, userID ) {
    return this.DB.studentCourse.findOrCreate({
      where: {
        courseID: courseID,
        userID: userID
      }
    })
  };

  removeStudentFromCourse( courseID, userID ) {
    return this.DB.studentCourse.destroy({
      where: {
        courseID: courseID,
        userID: userID
      }
    })
  };

}
