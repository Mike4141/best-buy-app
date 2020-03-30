import React from "react";
import "./App.css";
import config from "./config";
import { ReviewsContext } from "./ReviewsContext";
import auth from "./services/auth";

export default class AddReview extends React.Component {

  state = {
    title: "",
    content: "",
    product: null,
  };

  static contextType = ReviewsContext;


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
        }})
      .then(review => {
        console.log(review);

        this.context.addReview([review]);
        this.props.history.push("/reviews");
      })
      .catch(err => {
        this.setState({ error: err.error });

        console.log(err);
      });
  };

  render() {
  
    return (
      <div>
        <h1>Create a review</h1>
        <form onSubmit={this.onSubmitHandler} className="signup-form">
          <fieldset>
            <h2>Create Review</h2>
            {this.state.error}

            <div>
              <label >Title:</label>
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
