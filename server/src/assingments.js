export default class Assingments {
  constructor(courses) {
    this.courses = courses;
    this.assingmentID = 0;
    this.assingments = [];
    this.assingmentGradesID = 0;
    this.AssingmentGrades = [];
  }

  getAssingments() {
    return this.assingments;
  }

  getAssingment(assingmentID) {
    return this.assingments.filter(a => a.assingmentID === assingmentID);
  }

  createAssingment(courseID, name) {
    const course = this.courses.getCourse(courseID);

    if (!course) throw "Course not Found";

    assingment_new = { assignmentID: this.assingmentID, name: name };
    this.assingmentID++;

    if (!course.assingments) {
      course.assigments = [assingment_new];
    } else if (course.asignments.name !== name) {
      this.assingments.push(assingment_new);
      course.assigments.push(assingment_new);
    }
    return assingment_new;
  }

  deleteAssingment(assingmentID) {
    const assingment = this.getAssingment(assingmentID);

    if (!assingment) throw "Assingment not Found";

    this.assingments = this.assingments.filter(
      a => a.assingmentID !== assingmentID
    );
    this.courses.assingments = this.courses.assingments.filter(
      a => a.assingmentID !== assingmentID
    );

    return assingment;
  }

  createAssingmentGrade(assingmentID, studentID, grade) {
    const assingment = this.getAssingment(assingmentID);
    const student = this.courses.students.filter(
      s => s.studentID === studentID
    );

    if (!assingment) throw "Assingment not Found";
    if (!student) throw "Student not Found";

    assingmentGrade = {
      assingmentGradesID: this.assingmentGradesID,
      assingmentID: assingmentID,
      studentID: studentID,
      grade: grade
    };

    this.AssingmentGrades.push(assingmentGrade);
    this.assingmentGradesID++;

    return assingmentGrade;
  }