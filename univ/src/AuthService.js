import React, { Component } from "react";
import decode from 'jwt-decode';
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import ApoClient from "./ApolloClient";

class AuthService {
  static _instance = null;

    static getInstance() {
        if (AuthService._instance == null) {
            AuthService._instance = new AuthService();
        }

        return this._instance;
    }
    // Initializing important variables
    constructor() {
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(email, password) {

        console.log(email, password);

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
        }).then(result => {
            this.setToken(result.data);
            return Promise.resolve(result);
        });

    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 600) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(loginData) {
        localStorage.setItem('token', loginData.loginUser.token);
        localStorage.setItem('user', JSON.stringify(loginData.loginUser));

    }

    getToken() {
        return localStorage.getItem('token');
    }

    getRole() {
      return localStorage.getItem('role');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getProfile() {
        return decode(this.getToken());
    }

    getLoginUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}

const authService = AuthService.getInstance();
export default authService;
