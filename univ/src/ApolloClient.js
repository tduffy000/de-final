
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';


export const ApoClient = new ApolloClient({
  uri: "https://whispering-harbor-80622.herokuapp.com/",
});

export default ApoClient;

/*
<ApolloProvider client={client}>
</ApolloProvider>
*/