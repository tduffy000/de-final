import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
 
class Faculty extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Faculty</h1>
        <h3><NavLink to="/Faculty/CourseList">List of Courses </NavLink></h3>
        <h3><NavLink to="/Faculty/CreateCourse">Create New Course </NavLink></h3>
      </div>
    );
  }
}
 
export default Faculty;
