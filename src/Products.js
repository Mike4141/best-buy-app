import React from "react";
import { ReviewsContext } from "./ReviewsContext";
import { Link } from "react-router-dom";
//import React, { Component } from "react";

class Search extends React.Component {
  state = {
    search: ""
  };
  static contextType = ReviewsContext;

  onSubmit = event => {
    event.preventDefault();
    this.context.onFormSubmit(this.state.search);
  };

  onChange = event => {
    this.setState({
      search: event.target.value
    });

    console.log(event.target.value);
  };

  render() {
    return (
      <div>
        <h2>Search Products</h2>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            placeholder="search"
            type="text"
            required
          />
          {this.state.search}
          <button>Submit</button>
          {/* <button onClick={this.state.search}>Submit</button> */}


          {this.context.products.map(product => {
            return (
              <li>
                {product.name}
                <Link to={`/reviews/${product.sku}`}>Add Review</Link>
              </li>
            );
          })}
        </form>
      </div>
    );
  }
}

export default Search;
