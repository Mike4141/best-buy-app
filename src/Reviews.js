import React, { Component } from "react";
import "./App.css";
import { ReviewsContext } from "./ReviewsContext";
import ProductReviewsPreview from "./ProductReviewsPreview";

class Reviews extends Component {
  static contextType = ReviewsContext;

  render() {
    const reviews = this.context.reviews
    
    if (reviews.length === 0) {
      return <div>"No Reviews"</div>;
    }

  
    console.log(this.state);
    return (
      <div>
        <ProductReviewsPreview />
      </div>
    );
  }
}

export default Reviews;
