import React from "react";
import "./App.css";
import config from "./config";
import auth from "./services/auth"
import {ReviewsContext} from "./ReviewsContext"


class Login extends React.Component {
  state = {
    password: "",
    username: ""
  };

  static contextType = ReviewsContext;


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    fetch(`${config.API_BASE_URL}/auth/login`, {
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
        auth.saveAuthToken(data.authToken)
        this.context.login()

        this.props.history.push("/")

        console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err.error });
      });
  };

  render() {
    return (
      
      <form  

        onSubmit={this.onSubmitHandler}
        role="form"
        accept-charset="UTF-8"
        method="post"
        class="sign-up"
        
      > <div style={{alignItems:''}}>
        {this.state.error}
        
        
          
          <h2 className='' style={{ fontSize:'50px', marginLeft:''}}>Login</h2>
          
            <label htmlFor="username">Username</label>
            <input
              onChange={this.onChange}
              type="username"
              placeholder="foo@bar.com "
              name="username"
              id="username"
              required
            />
          

          
            <label htmlFor="password">Password</label>
            <input
              onChange={this.onChange}
              placeholder="1234passw0rd"
              type="password"
              name="password"
              id="password"
              required
            />
          
          

          <button type="submit" style={{width:'100%'}}>Log In</button>
          
        
        
      </div>
      </form>
      
    );
  }
}

export default Login;
