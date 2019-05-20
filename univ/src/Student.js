import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
 
class Student extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Courses</h1>
        <h3> List of Courses </h3>
        <li><NavLink to="/Student/DataScience"> Data Science</NavLink> </li>
        <li><NavLink to="/Student/MachineLearning">Machine Learning</NavLink> </li>
        <li><NavLink to="/Student/BigData">Big Data</NavLink> </li>
      </div>
    );
  }
}
 
export default Student;
