import React, { Component } from "react";
import "./App.css";
import { ReviewsContext } from "./ReviewsContext";

class Reviews extends Component {
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

  componentDidMount() {
    fetch(
      "https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=sku,image,name,salePrice&apiKey=PcAeIflJtvosaabGyhGYJ0mc"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data }); //same as data:data
      });
  }

  render() {
    console.log(this.state);
    return (
      <div></div>
    );
  }
}

export default Reviews;
