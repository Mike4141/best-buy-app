import React from "react";
import { ReviewsContext } from "./ReviewsContext";
import { Link } from "react-router-dom";
//import React, { Component } from "react";

class Search extends React.Component {
  static contextType = ReviewsContext;

  state = {
    search: ""

  };

  onSubmit = event => {
    event.preventDefault();
    this.context.onFormSubmit(this.state.search);
  };

  onChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  render() {
    return (
      <div>
        <h2>Search Products</h2>

        <p>search for a product to create a review</p>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            placeholder="search"
            type="text"
            required
          />
          <button>Submit</button>

          {this.context.searchedProducts.map(product => {
            return (
              <li key={product.sku}>
                {product.name}
                <Link to={`/reviews/create/${product.sku}`}>Add Review</Link>
              </li>
            );
          })}
        </form>
      </div>
    );
  }
}

export default Search;
