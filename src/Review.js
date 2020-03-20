import React from "react";
import { ReviewsContext } from "./ReviewsContext";

export default class Review extends React.Component {
  static contextType = ReviewsContext;

  render() {
    const review = this.context.reviews.find(review => {
      return String(review.id) === this.props.match.params.reviewId;
    });

    if (review === undefined) {
      return <div>Review not</div>;
    }
   

    return (
      <div>
        {review.title}
        <br></br>

        <p>
          created by: {review.author.username}
          <br></br>
        </p>
        {review.created_at.toString()}
        <br></br>
        {review.content}
      </div>
    );
  }
}
