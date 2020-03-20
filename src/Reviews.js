import React, { Component } from "react";
import "./App.css";
import { ReviewsContext } from "./ReviewsContext";
import ProductReviewsPreview from "./ProductReviewsPreview";

class Reviews extends Component {
  static contextType = ReviewsContext;

  render() {
    console.log(this.state);
    return (
      <div>
        <ProductReviewsPreview />
      </div>
    );
  }
}

export default Reviews;
