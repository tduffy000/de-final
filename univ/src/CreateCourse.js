import React, { Component } from "react";

import  myCourseService from "./CourseService";

class CreateCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
        name: "",
        id: ""
    };
    this.cService = myCourseService;
  }
  onFormSubmit = event => {
    event.preventDefault();
    this.cService.addCourse(event.target.name.value, event.target.id.value);
    event.target.reset();
  };

  render() {
    return (
      <div>
        <h2>Create Course Form</h2>
        <br/>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <label>
            Course Id:
            <input type="text" name="id"
            value={this.state.name.value}/><br/>
          </label>
          <br/>
          <label>
            Course Name:
            <input type="text" name="name"/><br/>
          </label>
          <br/>
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}
export default CreateCourse;
