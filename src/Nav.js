import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
      <div className="hamburger">&#9776;</div>
      <ul className="menu">

       
  
        <Link to="/create-review">
        <li>Create Review</li>
        </Link>
  
        <Link to="/reviews">
        <li>Review's</li>
        </Link>

        <Link to="/register">
        <li>Register</li>
        </Link>

        <Link to="/">
        <li>Home</li>
        </Link>

        <Link to="/login">
        <li>Login</li>
        </Link>


      
      
      </ul>
    </nav>
  
      
     
    );
  }
}

export default Nav;
