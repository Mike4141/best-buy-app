import React, { Component } from "react";
import "./App.css";
import { ReviewsContext } from "./ReviewsContext";

class Reviews extends Component {

  static contextType = ReviewsContext;
 


  render() {

    console.log(this.state);
    return (
      <div>
        
        <ul>
          {this.context.reviews.map(review => {
            return (
              <li key={review.id}>
                <h3>{review.title}</h3>
                <p>
                  {review.content}
                </p>
              </li>

              
            );
          })}
        </ul>



      </div>
    );
  }
}

export default Reviews;
