import React, { Component } from "react";

import  myCourseService from "./CourseService";

class CreateAssignment extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id: "",
        name: "",
    };
    this.cService = myCourseService;
  }
  onFormSubmit = event => {
    event.preventDefault();
    this.cService.createAssignment(event.target.id.value,event.target.name.value);
    event.target.reset();
  };

  render() {
    return (
      <div>
        <h2>Create Assignment Form</h2>
        <br/>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <label>
            Course Id:
            <input type="text" name="id"
            value={this.state.id.value}/><br/>
          </label>
          <br/>
          <label>
            Assignment Name:
            <input type="text" name="name"
            value={this.state.name.value}/><br/>
          </label>
          <br/>
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}
export default CreateAssignment;
