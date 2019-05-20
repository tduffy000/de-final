import React, { Component } from "react";

import  myCourseService from "./CourseService";

class RemoveStudentFromCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
        cid: "",
        sid: ""
    };
    this.cService = myCourseService;
  }
  onFormSubmit = event => {
    event.preventDefault();
    this.cService.removeStudentFromCourse(event.target.cid.value,event.target.sid.value);
    event.target.reset();
  };

  render() {
    return (
      <div>
        <h2>Remove Student to Course Form</h2>
        <br/>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <label>
            Course Id:
            <input type="text" name="cid"
            value={this.state.cid.value}/><br/>
          </label>
          <br/>
          <label>
            Student Id:
            <input type="text" name="sid"
            value={this.state.sid.value}/><br/>
          </label>
          <br/>
          <input type="submit" value="RemoveStudentFromCourse" />
        </form>
      </div>
    );
  }
}
export default RemoveStudentFromCourse;
