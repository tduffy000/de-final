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

  async createAssignmentGrade( assignmentID, studentID, courseID, grade ) {
    var r = await this.DB.StudentAssignment.update(
      {
        grade: grade
      },{
        where: {
          assignmentID: assignmentID,
          userID: studentID,
          courseID: courseID
        },
        returning: true
      }
    );
    if (r[0] === 0) {
      throw new TypeError('Could find perform query: check id parameters');
    };
    var a = await this.DB.Assignment.findByPk( assignmentID );
    var u = await this.DB.User.findByPk( studentID );
    return {
      id: r[1][0].dataValues.id,
      assignment: a,
      student: u,
      grade: grade};
  };

}
