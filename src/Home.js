import React from "react";
import "./App.css";
import { ReviewsContext } from "./ReviewsContext";

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
    console.log(this.context);
    return (
      <div className="App">
        <div>
          <h2>Search Products</h2>
          <input placeholder="search" type="search" required />
        </div>

        <img
          src="https://via.placeholder.com/1920x1080"
          width="800px"
          className="top-image"
        />

        <p>
          This would be an explanation of what your app is. Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Exercitationem, neque non
          voluptate natus enim dolor expedita incidunt.
        </p>

        <h2>Product Reviews</h2>

        <ul>
          {this.context.reviews.map(review => {
            return (
              <li>
                <h3>{review.title}</h3>
                <p>
                  {review.content}
                </p>
              </li>

              
            );
          })}
        </ul>
        <ReviewsContext.Provider value={this.state}>

        {this.state.data.products.map(product => {
          return (
            <li key={product.sku}>
              <h3>{product.name}</h3>
            </li>
          );
        })}
      </ReviewsContext.Provider>


      </div>
    );
  }
}

export default Home;
