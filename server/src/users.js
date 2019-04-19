import crypto from "crypto";
import AuthenticationError from "apollo-server";

export default class Users {

  constructor() {
    this.nextID = 3;
    // dummy users for testing
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

  filterByRole( role ) {
    return this.users.filter( u => u.role === role );
  }

  getUsers() {
    return this.users;
  }

  getStudents() {
    return this.filterByRole("Student");
  }

  getFaculty() {
    return this.filterByRole("Faculty");
  }

  getStudentByEmail(email) {
    return this.getStudents().filter(s => s.email === email)[0] || null;
  }

  list() {
    return this.users;
  }

  // TODO: this needs to change b/c we can now delete users
  // unless we mark for deletion without removing
  get(id) {
    return this.users[id - 1];
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
    u.name = user.name;
    u.email = user.email;
    return u;
  }

  // TODO: deleting by id messes us get() which uses id as index on this.users
  delete(id) {
    let u = this.users.find( u => u.id === id );
    if (u) {
      this.users = this.users.filter(
        user => user.id !== u.id
      );
      return u
    }
  }
}
