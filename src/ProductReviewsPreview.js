import React from "react";
import "./App.css";

import { ReviewsContext } from "./ReviewsContext";

export default class ProductReviewsPreview extends React.Component {
  state = {};
  static contextType = ReviewsContext;
  render() {
    return (
      <ul>
        {this.context.reviews.map((review) => {
          const product = this.context.products.find((product) => {
            console.log(String(product.sku), String(review.sku));

            return String(product.sku) === String(review.sku);
          });
          return (
            <div >
              <li >
                {product && <img className='img2' src={product.image} />}

                <div className='img-detail' style={{marginTop:'50px'}}>
                  <div style={{}}>
                  <h3>{review.title}</h3>

                  <p style={{ }}>{review.content}</p>
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    );
  }
}
