import React, { Component } from "react";
 
class CreateCourse extends Component {
  render() {
    return (
      <div>
        <h2>Create Course Form</h2>
        <br/>
        <form>
          <label>
            Course Id:
            <input type="text" name="CourseID" /><br/>
          </label>
          <br/>
          <label>
            Course Name:
            <input type="text" name="CourseName" /><br/>
          </label>
          <br/>
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}
export default CreateCourse;
