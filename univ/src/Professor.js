import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
 
class Professor extends Component {
  render() {
    return (
      <div>
        <h1>Welcome Professor!</h1>
        <h3>Your functions:</h3>
        <li><NavLink to="/Professor/CreateCourse">Create Course </NavLink></li>
        <li><NavLink to="/Professor/DeleteCourse">Delete Course </NavLink></li>
        <li><NavLink to="/Professor/UpdateCourse">Update Course </NavLink></li>
        <li><NavLink to="/Professor/AddStudentToCourse">Add Student to Course</NavLink></li>
        <li><NavLink to="/Professor/RemoveStudentFromCourse">Remove Student From Course</NavLink></li>
        <li><NavLink to="/Professor/CreateAssignment">Create Assignment</NavLink></li>
        <li><NavLink to="/Professor/CreateAssignmentGrade">Grade Assignment</NavLink></li>
      </div>
    );
  }
}
 
export default Professor;
