
export default class Assignment {

  constructor( db ) {
    this.DB = db;
  };

  createAssignment( name, courseID ) {
    return this.DB.Assignment.create({
      name: name,
      courseID: courseID
    });
  };

  removeAssignment( name, courseID ) {
    return this.DB.Assignment.destroy({
      name: name,
      courseID: courseID
    });
  };

  // TODO
  createAssignmentGrade( assignmentID, studentID, courseID, grade ) {
    return this.grade.update({
      grade: grade
    },{
      where: {
        assignmentID: assignmentID,
        studentID: studentID,
        courseID: courseID
      }
    })
  };

}
