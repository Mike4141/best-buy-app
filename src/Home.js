import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { ReviewsContext } from "./ReviewsContext";
import ProductReviewsPreview from "./ProductReviewsPreview";

class Home extends React.Component {
 
  static contextType = ReviewsContext;

  render() {
    const reviews = this.context.reviews;

    if (reviews.length === 0) {
      return (
        <div className='title-center'>
          <div>
            <h2>Search Products</h2>
            <Link to="/search">
              <p>Create product review</p>
            </Link>
          </div>

          <p>This app lets you add reviews for electronic products</p>

          <h2>No reviews</h2>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h2>Search Products</h2>
            <Link to="/search">
              <p>Create product review</p>
            </Link>
          </div>

          <p>This app lets you add reviews for electronic products</p>

          <h2>Product Reviews</h2>
          <ProductReviewsPreview />

        </div>
      );
      
    }

  
  }
}

export default Home;
