export default class Assignments {

  constructor() {
    this.nextID = 1;
    this.nextAssignmentID = 1;
    this.assignments = [];
  }

  getAssignments() {
    return this.assignments;
  }

  // update given presence of course deletion
  get(id) {
    return this.assignments.find( a => a.id == id );
  }

  create( name, course ) {
    if (!course) throw "Course field is not defined";
    let isNameUniqueInCourse = !course.assignments.reduce(
      (acc, a) => acc || a.name === name,
      false
    );
    const assignment = {
                          id: this.nextID++,
                          name: name,
                          course: course,
                          grades: []
                       };
    // add assignment to course
    course.assignments.push(assignment);
    // assignment to all students in course
    course.students.map(
      s => s.assignments.push( assignment )
    );
    this.assignments.push(assignment);
    return assignment;
  }

  createGrade(id, student, grade) {
    let assignment = this.assignments.get(id)

    if (!student) throw "Student field is not defined";
    let studentAssignment = student.assignments.find(
      a => a.id == id
    );
    if (!studentAssignment) throw "Student: " + student.name + "does not have assignment with id = " + id;

    // push onto this store of Assignments
    const assignmentGrade = {
                              id : this.nextAssignmentID++,
                              assignment: assignment,
                              student: student,
                              grade: grade
                            }
    assignment.grades.push(assignmentGrade);
    // push onto the students assignment
    studentAssignment.grades.push(assignmentGrade);
    return assignmentGrade;
  }
}
