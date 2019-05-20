import regeneratorRuntime from "regenerator-runtime";

export default class Assignment {

  constructor( db ) {
    this.DB = db;
  };

  async get( id ) {
    var a = await this.DB.Assignment.findByPk(id);
    return a;
  }

  createAssignment( name, courseID ) {
    // TODO: populate StudentAssignment for all students enrolled in the class
    return this.DB.Assignment.create({
      name: name,
      courseID: courseID
    });
  };

  removeAssignment( name, courseID ) {
    // TODO: de-populate StudentAssignment for all students enrolled in the class
    return this.DB.Assignment.destroy({
      name: name,
      courseID: courseID
    });
  };

  // TODO
  createAssignmentGrade( assignmentID, userID, courseID, grade ) {
    return this.DB.StudentAssignment.update({
      grade: grade
    },{
      where: {
        assignmentID: assignmentID,
        userID: userID,
        courseID: courseID
      }
    })
  };

}
