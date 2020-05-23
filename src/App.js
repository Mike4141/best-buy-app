import React, { Component } from "react";
import "./App.css";
import SearchReview from "./SearchReview";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Register from "./Register";
import Reviews from "./Reviews";
import AddReview from "./AddReview";
import config from "./config";
import ProfileReviews from "./ProfileReviews";
import {
  
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
    searchedProducts: [],
    products: [],
    reviews: [],
  };

  componentDidMount = () => {
    if (auth.hasAuthToken()) {
      this.setState({ isLoggedIn: true });
    }
    fetch(`${config.API_BASE_URL}/reviews/`)
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
        console.log(data.products)
        this.setState({ searchedProducts: data.products });
      });

    console.log(value);
  };

  addReview = reviews => {
    const alreadyExists = this.state.reviews.filter(review => {
      return reviews.some(r => r.id !== review.id);
    });

    console.log(reviews);
    if (alreadyExists) {
      return null;
    }

    this.setState({ reviews: this.state.reviews.push(reviews) });
  };

  deleteReview = reviewId => {
    this.setState({
      reviews: this.state.reviews.filter(review => {
        if (review.id !== reviewId) {
          return true;
        } else {
          return false;
        }
      })
    });
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
      searchedProducts: this.state.searchedProducts,
      deleteReview: this.deleteReview
    };
    return (
      <div className="App">
        <ReviewsContext.Provider value={value}>
          <Nav />
          <div className="page">
            <Switch>
              <PrivateRoute
                exact={true}
                path="/profile/reviews"
                component={ProfileReviews}
              />

              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/search" component={SearchReview} />

              <Route exact={true} path="/login" component={Login} />
              <Route exact={true} path="/register" component={Register} />

              <Route exact={true} path="/reviews" component={Reviews} />
              <PrivateRoute
                exact={true}
                path="/reviews/create/:sku"
                component={AddReview}
              />
              {/* /reviews/create */}
              {/* /reviews/123 */}
            </Switch>
          </div>
        </ReviewsContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
