import Login from "./login.js";
import regeneratorRuntime from "regenerator-runtime";

export default class Users {

  constructor( db ) {
    this.DB = db;
    this.login_manager = new Login( db );
  };

  async get( id ) {
    var u = await this.DB.User.findByPk(id);
    return u;
  };

  async findUserByEmail(emailAddress) {
    var u = await this.DB.User.findAll({
      where: {
        email: emailAddress
      }
    });
    return u;
  };

  async getUserRole( id ) {
    var u = await this.DB.User.findByPk(id);
    return u.role;
  };

  async getUsers() {
    var result = await this.DB.User.findAll();
    return result;
  };

  async getStudents() {
    var result = await this.DB.User.findAll({
      where: {role: "Student"},
      include: [
        {
          model: this.DB.Course,
          as: "courses"
        },{
          model: this.DB.Assignment,
          as: "assignments"
        }
      ]
    });
    return result;
  };

  async getFaculty() {
    var result = await this.DB.User.findAll({
      where: {role: "Professor"},
      include: [
        {
          model: this.DB.Course,
          as: "teaching"
        }
      ]
    })
    return result;
  }

  createUser( user ) {
    var passwordData = this.login_manager.genSaltHashPassword( user.password );
    return this.DB.User.create({
      name: user.name,
      email: user.email,
      role: user.role,
      passwordHash: passwordData.passwordHash,
      salt: passwordData.salt
    })
  };

  async updateUser( id, user ) {
    await this.DB.User.update(
      {
        name: user.name,
        email: user.email,
        role: user.role
      },{
        where: {
          id: id
        }
      }
    );

    var u = await this.DB.User.findByPk(id);
    return u;
  };

}
