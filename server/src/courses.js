/*
 * NEED TESTING:
 * - getter methods
 * - create course
 * - update course attributes
 * - delete a course
 * - add a student to a course
 * - remove a student from a course
 * COMPLETED TESTING:
 *
*/
export default class Courses {

  constructor() {
      this.nextID = 1;
      this.courses = [];
  }

  getCourses() {
    return this.courses;
  }

  get( id ) {
    return this.courses[id];
  }

  create( args ) {
    const course = {
                      id: this.nextID++, name: args.name,
                      professor: args.professor, students: [],
                      assignments: []
                    }

    // check if course is already defined (i.e. another has same name)
    let isNameUnique = this.courses.reduce(
      (acc, c) => acc || c.name === course.name,
      false
    );
    if (isNameUnique) {
      this.courses.push( course );
      return course;
    }
    return null;
  }

  update( id, changes ) {
    const course = this.get({id});
    changes.map(
      // match on key then update value
    )
  }

  delete( id ) {
    let course = this.courses.find( c => c.id === id );
    if ( course ) {

      // remove the course from all its enrolled students
      course.students.map(
        s => s.courses = s.courses.filter(
          c => c.id !== course.id
        )
      );

      // remove the course from its professor
      course.professor.courses = course.professor.courses.filter(
        c => c.id !== course.id
      );

      // remove it from the course store
      this.courses = this.courses.filter( c => c.id !== course.id );

      return c;
    }
  }

  // check if a certain student is enrolled in a given course
  isStudentEnrolled( course, student ) {
    return course.students.reduce(
      (acc, s) => acc || s.id === student.id,
      false
    );
  }

  addStudent( courseID, student ) {
    let course = this.courses.find( c => c.id === courseID );

    if (!this.isStudentEnrolled(course, student) && course) {
      // add student to the class
      course.students.push( student );
      // add course to the student's course load
      student.courses.push( course );
    }
    return student;
  }

  removeStudent( courseID, student ) {
    let course = this.courses.find( c => c.id === courseID );

    if (this.isStudentEnrolled(course, student) && course) {
      // remove student from class
      course.students = course.students.filter(
        s => s.id !== student.id
      );
      // remove course from student's course load
      student.courses = student.courses.filter(
        c => c.id !== course.id
      );
    }

  }
}
