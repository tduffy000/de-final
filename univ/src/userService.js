import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import ApoClient from "./ApolloClient";

class UserService {
    static currInstance = null;

    static getUser() {
        if (this.currInstance == null) {
            this.currInstance = new UserService();
        }
        return this.currInstance;
    }

    loginUser = (email,password) => {
      console.log("email:",email,"password:",password);
      return ApoClient.mutate({
          mutation: gql`
          mutation LoginUser($email: String!, $password: String!) {
              loginUser(email: $email, password: $password) {
                  token
                  user {
                    id
                  }
                }
              }
          `, variables: { email, password },
      });
    };


    addUser = (fname,email,password,role) => {
      console.log("fname:",fname,"email:",email,"password:",password,"role:",role);
      return ApoClient.mutate({
          mutation: gql`mutation createUser($name: String!, $email: String!, $role: Role, $password: String!){
                 createUser(user: {name: $name, email: $email, role: $role, password: $password}) {
                          id  name
                        }
                }
      `,
          variables: { name: fname, email: email, role: role, password: password }, }
      );
    };

    updateUser = (id,fname,email,password,role) => {
      console.log("id:",id,"fname:",fname,"email:",email,"password:",password,"role:",role);
      return ApoClient.mutate({
          mutation: gql`mutation updateUser($id: ID!, $name: String!, $email: String!, $role: Role, $password: String!){
                 updateUser(id: $id, user: {name: $name, email: $email, role: $role, password: $password}) {
                          id  name
                        }
                }
      `,
          variables: { id: id, name: fname, email: email, role: role, password: password }, }
      );
    };
}

const myUserService = UserService.getUser();
export default myUserService;
