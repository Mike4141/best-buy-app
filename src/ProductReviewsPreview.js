import React from "react";
import { ReviewsContext } from "./ReviewsContext";

export default class ProductReviewsPreview extends React.Component {
  static contextType = ReviewsContext;
  render() {
    return (
      <ul>

        {this.context.reviews.map(review => {
          const product = this.context.products.find(product => {
            console.log(String(product.sku), String(review.sku));

            return String(product.sku) === String(review.sku);
          });
          return (
            
            <li className="review-preview">
              {product && <img
                src={product.image}
                width="800px"
                className="top-image"
              />}

              
              <div>
                <h3>{review.title}</h3>

                <p>{review.content}</p>
              </div>
              
            </li>

            
            
          );
        })}
      </ul>
    );
  }
}
