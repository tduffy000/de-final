import { ForbiddenError,
         AuthenticationError } from "apollo-server";



export default class Users {
  constructor(db) {
    this.user = db.User
  }

  getUsers() {
    return this.user.findAll().then((r) => {
      return JSON.parse(JSON.stringify(r))
    })
  }

  getRole(role) {
    return this.user.findAll({
      where: {role: role}
    })
  }

  createUser(name, email, role) {
    return this.user.create({
      name: name,
      email: email,
      role: role
    });
  }

  updateUser(name, email, role) {
    return this.user.update({
      name: name,
      email: email,
      role: role
    },{
      where: {id: id}
    });
  }

}
