import Login from "./login.js";

export default class Users {

  constructor( db ) {
    this.DB = db;
  };

  getUsers() {
    return this.DB.User.findAll().then((r) => {
      return JSON.parse(JSON.stringify(r))
    })
  };

  getByRole( role ) {
    return this.DB.User.findAll({
      where: {role: role}
    })
  };

  createUser( user ) {
    var login_manager = new Login();
    var passwordData = login_manager.genSaltHashPassword( user.password );

    return this.DB.User.create({
      name: user.name,
      email: user.email,
      role: user.role,
      passwordHash: passwordData.passwordHash,
      salt: passwordData.salt
    })
  };

  updateUser( id, name, email, role ) {
    return this.DB.User.update({
      name: name,
      email: email,
      role: role
    },{
      where: {id: id}
    })
  };

  // TODO: should be a calculated field in table
  getGPA( id ) {
    return null;
  };

}
