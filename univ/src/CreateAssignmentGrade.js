import React, { Component } from "react";

import  myCourseService from "./CourseService";

class CreateAssignmentGrade extends Component {

  constructor(props) {
    super(props);
    this.state = {
        aid: "",
        sid: "",
        grade: ""
    };
    this.cService = myCourseService;
  }
  onFormSubmit = event => {
    event.preventDefault();
    this.cService.createAssignmentGrade(event.target.aid.value,event.target.sid.value,event.target.grade.value);
    event.target.reset();
  };

  render() {
    return (
      <div>
        <h2>Grade Assignment Form</h2>
        <br/>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <label>
            Assignment Id:
            <input type="text" name="aid"
            value={this.state.aid.value}/><br/>
          </label>
          <br/>
          <label>
            Student Id:
            <input type="text" name="sid"
            value={this.state.sid.value}/><br/>
          </label>
          <br/>
          <label>
            Grade:
            <input type="text" name="grade"
            value={this.state.grade.value}/><br/>
          </label>
          <br/>
          <input type="submit" value="GradeAssignment" />
        </form>
      </div>
    );
  }
}
export default CreateAssignmentGrade;
