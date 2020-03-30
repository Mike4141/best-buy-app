import React from "react";
import auth from "./services/auth";
import config from "./config";
import { ReviewsContext } from "./ReviewsContext";

export default class ProfileReviews extends React.Component {
  static contextType = ReviewsContext;

  componentDidMount = () => {
    const payload = auth.decodeAuthToken();
    console.log(payload);
    fetch(`${config.API_BASE_URL}/reviews/users/${payload.user_id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.context.addReview(data);
      });
  };

  deleteReview = review => {
    fetch(`${config.API_BASE_URL}/reviews/${review.id}`, {
      method: "delete",
      headers: { authorization: `Bearer ${auth.getAuthToken()}` }
    })
      .then(response => {
        this.context.deleteReview(review.id);
      })
      .then(data => {
        console.log(data);
      });
  };

  render() {
    const payload = auth.decodeAuthToken();

    const reviews = this.context.reviews.filter(review => {
      if (review.author === payload.user_id) {
        return true;
      }
    });

    if (reviews.length === 0) {
      return <div>No Reviews</div>;
    }

    return (
      <div>
        {reviews.map(review => {
          const product = this.context.products.find(product => {
            console.log(String(product.sku), String(review.sku));

            return String(product.sku) === String(review.sku);
          });
          return (
            
            <div>
              <img
                src={product && product.image}
                width="800px"
                className="top-image"
              />
              <h3>{review.title}</h3>
              <button onClick={() => this.deleteReview(review)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}
