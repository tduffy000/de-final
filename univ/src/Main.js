import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Student from "./Student";
import Faculty from "./Faculty";
import Admin from "./Admin";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import CreateList from "./CreateList";
import CreateCourse from "./CreateCourse";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
import AddStudentToCourse from "./AddStudentToCourse";
import RemoveStudentFromCourse from "./RemoveStudentFromCourse";
import CreateAssignment from "./CreateAssignment";
import CreateAssignmentGrade from "./CreateAssignmentGrade";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Welcome to University</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/Student">Student</NavLink></li>
            <li><NavLink to="/Faculty">Faculty</NavLink></li>
            <li><NavLink to="/Admin">Admin</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/Student" component={Student}/>
            <Route path="/Faculty" component={Faculty}/>
            <Route path="/Admin" component={Admin}/>




            <Route path="/Faculty/CreateCourse" component={CreateCourse}/>
            <Route path="/Faculty/DeleteCourse" component={DeleteCourse}/>
            <Route path="/Faculty/UpdateCourse" component={UpdateCourse}/>
            <Route path="/Faculty/AddStudentToCourse" component={AddStudentToCourse}/>
            <Route path="/Faculty/RemoveStudentFromCourse" component={RemoveStudentFromCourse}/>
            <Route path="/Faculty/CreateAssignment" component={CreateAssignment}/>
            <Route path="/Faculty/CreateAssignmentGrade" component={CreateAssignmentGrade}/>


            <Route path="/Admin/CreateUser" component={CreateUser}/>
            <Route path="/Admin/UpdateUser" component={UpdateUser}/>
            <Route path="/Admin/CreateList" component={CreateList}/>
          </div>
          <br/>
          <br/>
          <form>
            <input type="submit" value="LogOut"/>
          </form>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;
