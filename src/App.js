import React, { Component } from "react";
import "./App.css";
import Search from "./Search";
import ProductReviewsPreview from "./ProductReviewsPreview";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Review from "./Review";
import Register from "./Register";
import Reviews from "./Reviews";
import CreateReview from "./CreateReview";
import config from "./config";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import { ReviewsContext } from "./ReviewsContext";
import auth from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.hasAuthToken() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class App extends Component {
  state = {
    isLoggedIn: false,
    searchedProducts:[],
    products: [], 

    reviews: []
  };

  componentDidMount = () => {
    const fetch1 = fetch(`${config.API_BASE_URL}/reviews/`)
      .then(response => {
        return response.json();
      })
      .then(reviews => {
        const skus = reviews
          .map(reviews => {
            return reviews.sku;
          })
          .join();
        console.log(skus);
        fetch(
          `https://api.bestbuy.com/v1/products(sku in (${skus}))?show=image,thumbnailImage,regularPrice,sku&format=json&apiKey=PcAeIflJtvosaabGyhGYJ0mc`
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({ products: data.products });
          });

        this.setState({ reviews });
      });
  };

  onFormSubmit = value => {
    const search = value
      .trim()
      .replace(/\s*/, " ")
      .split(" ")
      .filter(Boolean)
      .map(term => `search=${term}`)
      .join("&");

    fetch(
      `https://api.bestbuy.com/v1/products(${search})?format=json&show=sku,image,name,salePrice&apiKey=PcAeIflJtvosaabGyhGYJ0mc`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ searchedProducts: data.products });
      });

    console.log(value);
  };

  addReview = review => {
    console.log(review)

    this.setState({ reviews: this.state.reviews.concat(review) });
    this.props.history.push(`/reviews/${review.id}`);
  };

  logout = () => {
    this.setState({ isLoggedIn: false });
  };

  login = () => {
    this.setState({ isLoggedIn: true });
  };

  render() {
    console.log(this.state);
    const value = {
      isLoggedIn: this.state.isLoggedIn,
      logout: this.logout,
      login: this.login,
      onFormSubmit: this.onFormSubmit,
      products: this.state.products,
      reviews: this.state.reviews,
      addReview: this.addReview,
      searchedProducts: this.state.searchedProducts
    };
    return (
      <div className="App">
        <ReviewsContext.Provider value={value}>
          <Nav />
          <div className="page">
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/search" component={Search} />

              <Route exact={true} path="/login" component={Login} />
              <Route exact={true} path="/register" component={Register} />

              <Route exact={true} path="/reviews" component={Reviews} />
              <PrivateRoute
                exact={true}
                path="/reviews/create/:sku"
                component={CreateReview}
              />
              {/* /reviews/create */}
              {/* /reviews/123 */}
              <Route
                exact={true}
                path="/reviews/:reviewId"
                component={Review}
              />
            </Switch>
          </div>
        </ReviewsContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
