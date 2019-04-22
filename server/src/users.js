// import crypto from "crypto";
import AuthenticationError from "apollo-server";

export default class Users {

  constructor() {
    this.nextID = 3;
    // dummy users for testing (Remove for production)
    this.users = [
      {
        id: 0,
        name: "zero",
        email: "zero@example.com",
        role: "Admin"
      },
      {
        id: 1,
        name: "one",
        email: "one@example.com",
        role: "Student",
        courses: [],
        assignments: [],
        gpa: null
      },
      {
        id: 2,
        name: "prof",
        email: "admin@example.com",
        role: "Faculty",
        courses: []
      }
    ];
  };

  get(id) {
    return this.users.find( u => u.id == id);
  }

  filterByRole( role ) {
    return this.users.filter( u => u.role === role );
  }

  getUsers() {
    return this.users;
  }

  getStudents() {
    return this.filterByRole("Student");
  }

  getStudent(id) {
    const students = this.getStudents();
    let student = students.find( s => s.id == id );
    if (!student) throw "There is no student with id = " + id;
    return student;
  }

  getFaculty() {
    return this.filterByRole("Faculty");
  }

  getProfessor(id) {
    const faculty = this.getFaculty();
    let prof = faculty.find( f => f.id == id );
    if (!prof) throw "There is no faculty member with id = " + id;
    return prof;
  }

  getStudentByEmail(email) {
    return this.getStudents().filter(s => s.email === email)[0] || null;
  }

  list() {
    return this.users;
  }

  create({ user }) {
    const base = {
                    id: this.nextID++,
                    name: user.name,
                    email: user.email,
                    role: user.role
                  };
    // append role specific attributes
    switch ( user.role ) {
      case "Student":
        var u = {...base, courses: [], assignments: [], gpa: null};
        break;
      case "Faculty":
        var u = {...base, courses: []};
        break;
      default:
        var u = {...base};
        break;
    };
    this.users.push(u);
    return u;
  }

  update({ id, user }) {
    const u = this.get( id );
    if (!u) throw "Could not find user with id = " + id;
    u.name = user.name;
    u.email = user.email;
    return u;
  }

  delete(id) {
    let u = this.users.get(id);
    if (!u) throw "Could not find user with id = " + id;
    this.users = this.users.filter(
      user => user.id !== u.id
    );
    return u
  }
}
