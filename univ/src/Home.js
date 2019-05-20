import React, { Component } from "react";

import  myuserService from "./userService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userid: "",
        password:""
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uService = myuserService;
  }

  handleUserChange(event) {
   this.setState({userid: event.target.value});
  }
  handlePasswordChange(event) {
   this.setState({password: event.target.value});
  }

   handleSubmit(event) {
     event.preventDefault();
     this.uService.loginUser(this.state.userid,this.state.password);
     this.setState({userid: "",password:""});
     event.target.reset();
     /*alert('Your role is: ' + this.state.role);*/
   }
  render() {
    return (
      <div>
        <h2>City College of New York</h2>
        <br/>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email Id:
            <input type="text" name="userid"
            value={this.state.userid} onChange={this.handleUserChange}/><br/>
          </label>
          <br/>
          <label>
            Password:
            <input type="password" name="password"
            value={this.state.password} onChange={this.handlePasswordChange}/><br/>
          </label>
          <br/>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Home;
