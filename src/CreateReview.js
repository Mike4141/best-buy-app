import React from "react";
import "./App.css";

import { ReviewsContext } from "./ReviewsContext";

export default class CreateReview extends React.Component {
  static contextType = ReviewsContext;

  state = {
    title: "",
    content: "",
    product: null
  };

  componentDidMount() {
    const sku = this.props.match.params.sku;
    const url = `https://api.bestbuy.com/v1/products(sku=${sku})?show=customerReviewAverage,customerReviewCount,name,sku,image&format=json&apiKey=PcAeIflJtvosaabGyhGYJ0mc`;

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.products.length > 0) {
          this.setState({ product: data.products[0] });
        }
      });
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const review = {
      author: { username: "Mike P" },

      product: this.state.product,
      created_at: new Date(),
      title: this.state.title,
      content: this.state.content
    };

    console.log(review);

    this.context.addReview(review);
  };

  render() {
    if (!this.state.product) {
      return null;
    }

    return (
      <div>
        <h1>Create a review</h1>
        <form onSubmit={this.onSubmitHandler} role="form" className="signup-form">
          <fieldset>
            <legend>Create Review</legend>

            <div>
              <label htmlFor="user-email">Title:</label>
              <input
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Posting title here"
                name="title"
                id="review-title"
                required
              />
            </div>

            <div>
              <textarea
                onChange={this.onChangeHandler}
                id="review-content"
                name="content"
              ></textarea>
            </div>

            <button type="submit">submit</button>
          </fieldset>
        </form>
      </div>
    );
  }
}
