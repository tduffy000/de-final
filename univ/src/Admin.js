import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
 
class Admin extends Component {
  render() {
    return (
      <div>
        <h1>Admin Home</h1>
        <h3>Your functions</h3>
        <li><NavLink to="/Admin/CreateUser">Create User</NavLink> </li>
        <li><NavLink to="/Admin/DeleteUser">Delete User</NavLink> </li>
        <li><NavLink to="/Admin/CreateList">Todo List</NavLink> </li>
      </div>
    );
  }
}
 
export default Admin;
