import React, { Component } from "react";
import "./App.css";
import { Link, withRouter } from "react-router-dom";
import auth from "./services/auth";
import {ReviewsContext} from "./ReviewsContext"

class Nav extends Component {
static contextType = ReviewsContext;

  logout = () => {
    auth.clearAuthToken();
    this.context.logout()
    this.props.history.push("/");

  };

  render() {
    let button;
    if (this.context.isLoggedIn) {
    
      button = (
        <Link onClick={this.logout} to="/logout">
          logout
        </Link>
      );
    } else {
      button = <Link to="/login">login</Link>;
    }

    return (
      <nav className="navbar">
        {/* <div className="hamburger">&#9776;</div> */}
        <ul className="menu">
          <li>
            <Link to="/search">Create Review</Link>
          </li>

          <li>
            <Link to="/reviews">Review's</Link>
          </li>

          <li>
            <Link to="/">Home</Link>
          </li>
          <li>{button}</li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
