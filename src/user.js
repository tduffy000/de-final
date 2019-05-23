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

  gradeToFloat( letterGrade ) {
    var gradeAsFloat = GRADE_MAP[letterGrade[0]];
    if( letterGrade.length > 1 ) {
      if (letterGrade[1] === '+') {
        return gradeAsFloat + 0.33
      } else {
        return gradeAsFloat - 0.33
      }
    } else {
      return gradeAsFloat;
    }
  };

  assignmentReducer(acc, val) {
    const GRADE_MAP = {'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0};
    var gradeAsFloat = GRADE_MAP[val.grade[0]];
    if ( val.courseID in acc ) {
      var t = acc[val.courseID];
      acc[val.courseID] = [ t[0] + gradeAsFloat, t[1] + 1 ]
    } else {
      acc[val.courseID] = [ gradeAsFloat, 1 ]
    }
    return acc
  };

  courseReducer(acc, val) {
    acc.push(val[1]);
    return acc;
  };

  // [User, [StudentAssignments]] => [User, [CourseAssignmentGrades]] =>
  // [User, CourseAssignmentAverages] => [User, GPA]
  calculateGPA( queryResult ) {
    let gpaMap = queryResult.map(
      u => u.StudentAssignments.reduce(
             this.assignmentReducer, {}
           )
      ).map(
        x => Object.entries(x).map(
          ([course, g]) => [course, g[0]/g[1]]
        )
      ).map(
        x => x.reduce(
               this.courseReducer,[]
             )
      ).map(
        x => {
          const tot = x.reduce((acc, v) => acc + v, 0)
          return tot/x.length
        }
    );
    return gpaMap
  };

  async updateGPA( query ) {
    const gpaMap = this.calculateGPA( query );
    for (var i = 0; i < gpaMap.length; i++) {
      this.DB.User.update(
        {
          gpa: gpaMap[i]
        },{
          where: {
            id: result[i].id
          }
        }
      )
    };
  };

  async getStudents() {
    // first query required (join w/ StudentAssignments) to calculate GPA column
    var q = await this.DB.User.findAll({
      where: {role: "Student"},
      include: [
        {
          model: this.DB.Course,
          as: "courses"
        },{
          model: this.DB.Assignment,
          as: "assignments"
        },{
          model: this.DB.StudentAssignment
        }
      ]
    });
    this.updateGPA( q );
    // after GPA updated; can return full query
    var result = await this.DB.User.findAll({
      where: {role: "Student"},
      include: [
        {
          model: this.DB.Course,
          as: "courses"
        },{
          model: this.DB.Assignment,
          as: "assignments"
        },{
          model: this.DB.StudentAssignment
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
  };

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
