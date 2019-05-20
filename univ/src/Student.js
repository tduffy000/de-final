import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import  myCourseService from "./CourseService";

class Student extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id: "",
    };
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cService = myCourseService;
  }

  handleIdChange(event) {
   this.setState({id: event.target.value});
  }

   handleSubmit(event) {
     event.preventDefault();
     this.cService.addStudentToCourse(this.state.id);
     this.setState({id:""});
     event.target.reset();
     /*alert('Your role is: ' + this.state.role);*/
   }

  render() {
    return (
      <div>
        <h1>Welcome to Courses</h1>
        <h3> List of Courses </h3>
        <li><NavLink to="/Student/DataScience"> Data Science</NavLink> </li>
        <li><NavLink to="/Student/MachineLearning">Machine Learning</NavLink> </li>
        <li><NavLink to="/Student/BigData">Big Data</NavLink> </li>
        <h3> Add Course </h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Course ID:
            <input type="text" name="idf"
            value={this.state.id} onChange={this.handleIdChange}/><br/>
          </label>
          <br/>
          <input type="submit" value="Add"/>
        </form>
      </div>
    );
  }
}
 
export default Student;
