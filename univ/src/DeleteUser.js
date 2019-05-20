import React, { Component } from "react";
 
class DeleteUser extends Component {
  render() {
    return (
      <div>
        <h2>Delete User Form</h2>
        <br/>
        <form>
          <label>
            Email:
            <input type="text" name="DelEmail" /><br/>
          </label>
          <br/>
          <input type="submit" value="Delete" />
        </form>
      </div>
    );
  }
}
export default DeleteUser;
