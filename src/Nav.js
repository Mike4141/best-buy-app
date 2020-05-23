import React, { Component } from "react";
import "./App.css";
import { Link, withRouter } from "react-router-dom";
import auth from "./services/auth";
import { ReviewsContext } from "./ReviewsContext";

class Nav extends Component {
  static contextType = ReviewsContext;

  logout = () => {
    auth.clearAuthToken();
    this.context.logout();
  };

  render() {
    let myProfile;
    let registerButton;
    let button;
    if (this.context.isLoggedIn) {
      myProfile = <Link to="/profile/reviews">My profile</Link>;

      button = (
        <Link onClick={this.logout} to="/login">
          logout
        </Link>
      );
    } else {
      registerButton = <Link to="/register">Register</Link>;

      button = <Link to="/login">login</Link>;
    }

    return ( 
      <nav className="navbar">
        <ul className="menu">
          <li>{myProfile}</li>
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
          <li>{registerButton}</li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
