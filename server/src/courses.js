export default class Courses {

  constructor() {
      this.nextID = 1;
      this.courses = [];
  }

  getCourses() {
    return this.courses;
  }

  // TODO: re-do b/c we're deleting courses
  get( id ) {
    return this.courses[id - 1];
  }

  // the ID's should be the keys
  // {id : {...values}}
  // @see https://stackoverflow.com/questions/1144705/best-way-to-store-a-key-value-array-in-javascript
  create( name, professor ) {
    if (!professor) throw "Professor field not defined!";
    const course = {
                      id: this.nextID++,
                      name: name,
                      professor: professor,
                      students: [],
                      assignments: []
                    };

    let isNameUnique = !this.courses.reduce(
      (acc, c) => acc || c.name === course.name,
      false
    );
    if (!isNameUnique) throw course.name + " is already being used";

    this.courses.push( course );
    professor.courses.push( course );
    return course;
  }

  update( id, changes ) {
    const course = this.get(id);
    changes.map(
      // TODO: match on key then update value
    )
  }

  delete( id ) {
    let course = this.get(id);
    if (!course) throw "Could not find a course with id = " + id;

    // remove the course from all its enrolled students
    if (course.students) {
      course.students.map(
        s => s.courses = s.courses.filter(
          c => c.id !== course.id
        )
      )
    };

    // remove the course from its professor
    course.professor.courses = course.professor.courses.filter(
      c => c.id !== course.id
    );

    // remove it from the course store
    this.courses = this.courses.filter( c => c.id !== course.id );

    return course;
  }

  // check if a certain student is enrolled in a given course
  isStudentEnrolled( course, student ) {
    return course.students.reduce(
      (acc, s) => acc || s.id === student.id,
      false
    );
  }

  addStudent( courseID, student ) {
    let course = this.get( courseID );
    if (!course) throw "Could not find course with id = " + courseID;
    if (this.isStudentEnrolled(course, student)) {
      throw student + " is alread enrolled in " + course;
    }
    // add student to the class
    course.students.push( student );
    // add course to the student's course load
    student.courses.push( course );
    return student;
  }

  removeStudent( courseID, student ) {
    let course = this.get( courseID );
    if (!course) throw "Could not find course with id = " + courseID;
    if (!this.isStudentEnrolled(course, student)) {
      throw student + " is not enrolled in " + course;
    }

    // remove student from class
    course.students = course.students.filter(
      s => s.id !== student.id
    );
    // remove course from student's course load
    student.courses = student.courses.filter(
      c => c.id !== course.id
    );
    return student;
  }
}
