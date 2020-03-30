import React from "react";
import "./App.css";
import config from "./config";

export default class Register extends React.Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    fetch(`${config.API_BASE_URL}/users/`, {
      headers: {
        "content-type": "application/json"
      },

      method: "post",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(err => {
            return Promise.reject(err);
          });
        }
      })
      .then(data => {
        this.props.history.push("/login");

        console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.setState({error: err.error})
      });
  };

  render() {
    return (

      
      <form
        onSubmit={this.onSubmitHandler}
        role="form"
        action="/signup"
        accept-charset="UTF-8"
        method="post"
        className="signup-form"
      >
        
        {this.state.error}
        <fieldset>
          <legend>Create an account</legend>
   
          <div>
            <label for="username">Username</label>
            <input
              onChange={this.onChange}
              type="text"
              placeholder="username"
              name="username"
              id="username"
              required
            />
          </div>

          <div>
            <label for="user-password">Password</label>
            <input
              onChange={this.onChange}
              placeholder="1234passw0rd"
              type="password"
              name="password"
              id="user-password"
              required
            />
          </div>

          <button type="submit">Sign up</button>
        </fieldset>
      </form>
    );
  }
}
