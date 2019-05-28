import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Student from "./Student";
import Professor from "./Professor";
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
import authService from "./AuthService";

class Main extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.auth = authService;
  }

  render() {
    return (
      <HashRouter>
        <div>
          <h1>Welcome to University</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/Student" component={Student}/>
            <Route path="/Professor" component={Professor}/>
            <Route path="/Admin" component={Admin}/>




            <Route path="/Professor/CreateCourse" component={CreateCourse}/>
            <Route path="/Professor/DeleteCourse" component={DeleteCourse}/>
            <Route path="/Professor/UpdateCourse" component={UpdateCourse}/>
            <Route path="/Professor/AddStudentToCourse" component={AddStudentToCourse}/>
            <Route path="/Professor/RemoveStudentFromCourse" component={RemoveStudentFromCourse}/>
            <Route path="/Professor/CreateAssignment" component={CreateAssignment}/>
            <Route path="/Professor/CreateAssignmentGrade" component={CreateAssignmentGrade}/>


            <Route path="/Admin/CreateUser" component={CreateUser}/>
            <Route path="/Admin/UpdateUser" component={UpdateUser}/>
            <Route path="/Admin/CreateList" component={CreateList}/>
          </div>
          <br/>
          <br/>
            <NavLink to="/" onClick={this.handleSubmit}><input type="submit" value="LogOut"/></NavLink>
        </div>
      </HashRouter>
    );
  }

  handleSubmit(event) {
    this.auth.logout();
    console.log("logged out")

  }
}

export default Main;
