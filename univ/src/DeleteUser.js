import React, { Component } from "react";

import  myuserService from "./userService";

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uService = myuserService;
  }
  handleEmailChange(event) {
   this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.uService.deleteUser(this.state.email);
    this.setState({email:""});
    event.target.reset();
    /*alert('Your role is: ' + this.state.role);*/
  }

  render() {
    return (
      <div>
        <h2>Delete User Form</h2>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" name="DelEmail"
            value={this.state.email} onChange={this.handleEmailChange}/><br/>
          </label>
          <br/>
          <input type="submit" value="Delete"/>
        </form>
      </div>
    );
  }
}
export default DeleteUser;
