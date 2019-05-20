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
import DataScience, {MachineLearning, BigData} from "./CourseDesc";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import CreateList from "./CreateList";
import CourseList from "./CourseList";
import CreateCourse from "./CreateCourse";

 
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

            <Route path="/Student/DataScience" component={DataScience}/>
            <Route path="/Student/MachineLearning" component={MachineLearning}/>
            <Route path="/Student/BigData" component={BigData}/>

            <Route path="/Faculty/CourseList" component={CourseList}/>
            <Route path="/Faculty/CreateCourse" component={CreateCourse}/>
            <Route path="/Faculty/CourseList/DataScience" component={DataScience}/>
            <Route path="/Faculty/CourseList/MachineLearning" component={MachineLearning}/>
            <Route path="/Faculty/CourseList/BigData" component={BigData}/>

            <Route path="/Admin/CreateUser" component={CreateUser}/>
            <Route path="/Admin/DeleteUser" component={DeleteUser}/>
            <Route path="/Admin/CreateList" component={CreateList}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;
