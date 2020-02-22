import React, { Component } from "react";
import "./App.css";
import Products from "./Products";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Register from "./Register";
import Reviews from "./Reviews";
import CreateReview from "./CreateReview";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReviewsContext } from "./ReviewsContext";

class App extends Component {
  state = {
    products: [],
    reviews: [
      {
        title: `Best Buy Reviews`,
        author: { username: "Mike P" },
        created_at: new Date(),
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, assumenda dolor adipisci culpa cumque illo commodi consequatur iste sint itaque in doloremque amet ad voluptate error illum, deserunt facilis fugiat.`
      }
    ]
  };

  onFormSubmit = value => {
    const search = value.trim().replace(/\s*/, ' ').split(' ').filter(Boolean).map(term => `search=${term}`).join('&')
    console.log(search)

    fetch(
      `https://api.bestbuy.com/v1/products(${search})?format=json&show=sku,image,name,salePrice&apiKey=PcAeIflJtvosaabGyhGYJ0mc`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ products: data.products }); 
      });

    
    console.log(value)

    };


  render() {
    console.log(this.state);
    const value = {
      onFormSubmit: this.onFormSubmit,
      products: this.state.products,
      reviews: this.state.reviews

    };
    return (
      <ReviewsContext.Provider value={value}>
        <Router>
          <Nav />

          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/products" component={Products} />

            <Route
              exact={true}
              path="/reviews"
              component={Reviews}
            />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/register" component={Register} />
            <Route exact={true} path="/create-review/:sku" component={CreateReview} />
          </Switch>
        </Router>
      </ReviewsContext.Provider>
    );
  }
}

export default App;
