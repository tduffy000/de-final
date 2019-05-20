import React, { Component } from "react";

import  myuserService from "./userService";

class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
        fname: "",
        lname: "",
        email:"",
        role:"student"
    };
    this.handleFNameChange = this.handleFNameChange.bind(this);
    this.handleLNameChange = this.handleLNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uService = myuserService;
  }

  handleFNameChange(event) {
   this.setState({fname: event.target.value});
  }
  handleLNameChange(event) {
   this.setState({lname: event.target.value});
  }
  handleEmailChange(event) {
   this.setState({email: event.target.value});
  }
  handleRoleChange(event) {
   this.setState({role: event.target.value});
  }

   handleSubmit(event) {
     event.preventDefault();
     this.uService.addUser(this.state.fname, this.state.lname,this.state.email,this.state.role);
     this.setState({fname: "",lname: "",email:"",role:"student"});
     event.target.reset();
     /*alert('Your role is: ' + this.state.role);*/
   }

  render() {
      return (
        <div>
          <h2>Create User Form</h2>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <input type="text" name="fname"
              value={this.state.fname} onChange={this.handleFNameChange}/><br/>
            </label>
            <br/>
            <label>
              Last Name:
              <input type="text" name="lname"
              value={this.state.lname} onChange={this.handleLNameChange}/><br/>
            </label>
            <br/>
            <label>
              Email:
              <input type="text" name="email"
              value={this.state.email} onChange={this.handleEmailChange}/><br/>
            </label>
            <br/>
            <label>
              Role:
              <select value={this.state.role} onChange={this.handleRoleChange}>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
            <br/>
            </label>
            <br/>
            <input type="submit" value="Create" />
          </form>
        </div>
      );
    }
  }
  export default CreateUser;
