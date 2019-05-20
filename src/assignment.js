import regeneratorRuntime from "regenerator-runtime";

export default class Assignment {

  constructor( db ) {
    this.DB = db;
  };

  async get( id ) {
    var a = await this.DB.Assignment.findByPk(id);
    return a;
  }

  async createAssignment( name, courseID ) {
    // create assignment in table
    var a = await this.DB.Assignment.create({
      name: name,
      courseID: courseID
    });
    // populate StudentAssignment for all students in the course (using StudentCourse table)
    var enrolled = await this.DB.StudentCourse.findAll({
      where: {courseID: courseID}
    })
    enrolled.forEach( async (v) => {
      await this.DB.StudentAssignment.create({
        courseID: v.courseID,
        userID: v.userID,
        assignmentID: a.id
      });
    })
    return a;
  };

  createAssignmentGrade( assignmentID, studentID, courseID, grade ) {
    return this.DB.StudentAssignment.update({
      grade: grade
    },{
      where: {
        assignmentID: assignmentID,
        userID: studentID,
        courseID: courseID
      }
    })
  };

}
