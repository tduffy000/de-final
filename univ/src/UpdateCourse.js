import React, { Component } from "react";

import  myCourseService from "./CourseService";

class UpdateCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id: "",
        name: "",
        profid:""
    };
    this.cService = myCourseService;
  }
  onFormSubmit = event => {
    event.preventDefault();
    this.cService.updateCourse(event.target.id.value,event.target.name.value, event.target.profid.value);
    event.target.reset();
  };

  render() {
    return (
      <div>
        <h2>Update Course Form</h2>
        <br/>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <label>
            Course Id:
            <input type="text" name="id"
            value={this.state.id.value}/><br/>
          </label>
          <br/>
          <label>
            Course Name:
            <input type="text" name="name"
            value={this.state.name.value}/><br/>
          </label>
          <br/>
          <label>
            Professor Id:
            <input type="text" name="profid"
            value={this.state.profid.value}/><br/>
          </label>
          <br/>
          <input type="submit" value="Update" />
        </form>
      </div>
    );
  }
}
export default UpdateCourse;
