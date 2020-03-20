import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { ReviewsContext } from "./ReviewsContext";
import ProductReviewsPreview from "./ProductReviewsPreview";

class Home extends React.Component {
  state = {
    data: { products: [] },
    reviews: [
      {
        title: `Best Buy Reviews`,
        author: { username: "Mike P" },
        created_at: new Date(),
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, assumenda dolor adipisci culpa cumque illo commodi consequatur iste sint itaque in doloremque amet ad voluptate error illum, deserunt facilis fugiat.`
      }
    ]
  };

  static contextType = ReviewsContext;

  

  render() {
    console.log(this.context);
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
        <ProductReviewsPreview/>
      </div>
    );
  }
}

export default Home;
