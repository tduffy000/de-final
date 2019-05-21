import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import myCourseService from "./CourseService";
import ApoClient from "./ApolloClient";

const AllCourses = () => (
  <Query
    query={gql`
      {
        courses {
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.courses.map((item, key) => (
        <div key={item.name}>
          <li> {item.name} </li>
        </div>
      ));

    }}
  </Query>
);

class Student extends Component {
  render() {
    return (
    <ApolloProvider client={ApoClient}>
      <div>
        <h1>Welcome Student!</h1>
        <h3> Course List </h3>
        <AllCourses/>
        <br/>
        <i>Sample courses to list course description </i>
        <br/>
        <li><NavLink to="/Student/DataScience"> Data Science</NavLink> </li>
        <li><NavLink to="/Student/MachineLearning">Machine Learning</NavLink> </li>
        <li><NavLink to="/Student/BigData">Big Data</NavLink> </li>
      </div>
    </ApolloProvider>
    );
  }
}
 
export default Student;
