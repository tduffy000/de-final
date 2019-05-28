import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

class CourseList extends Component {
  render() {
    return (
      <div>
        <h2>Course List</h2><br/>
        <li><NavLink to="/Professor/CourseList/DataScience"> Data Science</NavLink> </li>
        <li><NavLink to="/Professor/CourseList/MachineLearning">Machine Learning</NavLink> </li>
        <li><NavLink to="/Professor/CourseList/BigData">Big Data</NavLink> </li>
      </div>
    );
  }
}
export default CourseList;
