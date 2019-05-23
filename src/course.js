import Users from "./user.js";
import regeneratorRuntime from "regenerator-runtime";

export default class Courses {

  constructor( db ) {
    this.DB = db;
    this.user_manager  = new Users( db );
  };

  async get( id ) {
    var c = await this.DB.Course.findByPk(id);
    return c;
  };

  async getCourses() {
    var result = await this.DB.Course.findAll({
      include: [
        {
          model: this.DB.Assignment,
          as: "assignments"
        },{
          model: this.DB.User,
          as: "professor"
        },{
          model: this.DB.User,
          as: "students"
        }
      ]
    });
    return result;
  };

  createCourse( name, professorID ) {
    return this.DB.Course.create({
      name: name,
      professorID: professorID
    })
  };

  async deleteCourse( id ) {
    var c = await this.DB.Course.findByPk(id);
    await this.DB.Course.destroy({
      where: {id: id}
    });
    return c;
  };

  async updateCourse( courseID, name, professorID ) {
    await this.DB.Course.update(
      {
        professorID: professorID,
        name: name
      },{
        where: {
          id: courseID
        }
      }
    );

    var c = await this.DB.Course.findByPk(courseID);
    return c;
  };

  // TODO: add assignments in course to student's load
  async addStudentToCourse( userID, courseID ) {
    var userRole = await this.user_manager.getUserRole( userID );
    if (userRole !== "Student") {
      throw new TypeError('Only Students can be enrolled in Courses');
    }
    // is student already enrolled?
    var q = null;
    q = await this.DB.StudentCourse.findOne({
      where: {userID: userID,
              courseID: courseID}
    });
    // if not then enroll them
    if (!q) {
      await this.DB.StudentCourse.create({
        userID: userID,
        courseID: courseID
      });
    }
    var c = await this.DB.Course.findByPk(courseID);
    return c;
  };

  async removeStudentFromCourse( userID, courseID ) {
    var userRole = await this.user_manager.getUserRole( userID );
    if (userRole !== "Student") {
      throw new TypeError('Only Students can be enrolled in Courses');
    }
    return this.DB.StudentCourse.destroy({
      where: {
        userID: userID,
        courseID: courseID
      }
    })
  };

}
