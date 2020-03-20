import React from "react";
import "./App.css";
import config from "./config";
import { ReviewsContext } from "./ReviewsContext";
import auth from "./services/auth";

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

    //     const review = {
    //     author: { username: "Mike P" },

    //     product: this.state.product,
    //     created_at: new Date(),
    //     title: this.state.title,
    //     content: this.state.content
    //   };
    const data = {
      title: this.state.title,
      content: this.state.content,
      sku: this.props.match.params.sku
    };

    fetch(`${config.API_BASE_URL}/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.getAuthToken()}`
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(data => {
          return Promise.reject(data);
        });
      })
      .then(review => {
        console.log(review);

        this.context.addReview(review);
      })
      .catch(err => {
        this.setState({ error: err.error });

        console.log(err);
      });
  };

  render() {
    if (!this.state.product) {
      return null;
    }

    return (
      <div>
        <h1>Create a review</h1>
        <form onSubmit={this.onSubmitHandler} className="signup-form">
          <fieldset>
            <legend>Create Review</legend>
            {this.state.error}

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
