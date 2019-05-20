import React, { Component } from "react";

import  myCourseService from "./CourseService";

class DeleteCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id: ""
    };
    this.cService = myCourseService;
  }
  onFormSubmit = event => {
    event.preventDefault();
    this.cService.deleteCourse(event.target.id.value);
    event.target.reset();
  };

  render() {
    return (
      <div>
        <h2>Delete Course Form</h2>
        <br/>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <label>
            Course Id:
            <input type="text" name="id"
            value={this.state.id.value}/><br/>
          </label>
          <br/>
          <input type="submit" value="Delete" />
        </form>
      </div>
    );
  }
}
export default DeleteCourse;
