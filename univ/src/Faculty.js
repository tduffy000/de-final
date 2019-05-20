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
        <h1>Welcome Professor!</h1>
        <h3>Your functions:</h3>
        <li><NavLink to="/Faculty/CourseList">List of Courses </NavLink></li>
        <li><NavLink to="/Faculty/CreateCourse">Create Course </NavLink></li>
        <li><NavLink to="/Faculty/DeleteCourse">Delete Course </NavLink></li>
        <li><NavLink to="/Faculty/UpdateCourse">Update Course </NavLink></li>
        <li><NavLink to="/Faculty/AddStudentToCourse">Add Student to Course</NavLink></li>
        <li><NavLink to="/Faculty/RemoveStudentFromCourse">Remove Student From Course</NavLink></li>
        <li><NavLink to="/Faculty/CreateAssignment">Create Assignment</NavLink></li>
        <li><NavLink to="/Faculty/CreateAssignmentGrade">Grade Assignment</NavLink></li>
      </div>
    );
  }
}
 
export default Faculty;
