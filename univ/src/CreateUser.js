import React, { Component } from "react";
 
class CreateUser extends Component {
  render() {
    return (
      <div>
        <h2>Create User Form</h2>
        <br/>
        <form>
          <label>
            First Name:
            <input type="text" name="FirstName" /><br/>
          </label>
          <br/>
          <label>
            Last Name:
            <input type="text" name="LastName" /><br/>
          </label>
          <br/>
          <label>
            Last Name:
            <input type="text" name="Email" /><br/>
          </label>
          <br/>
          <label>
            Role:
            <input type="text" name="Role" /><br/>
          </label>
          <br/>
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}
export default CreateUser;
