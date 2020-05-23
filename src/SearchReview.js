import React from "react";
import { ReviewsContext } from "./ReviewsContext";
import { Link } from "react-router-dom";

export default class SearchReview extends React.Component {
  static contextType = ReviewsContext;

  state = {
    search: "",
    searchRequested:false
  };

  onSubmit = event => {
    event.preventDefault();
    this.context.onFormSubmit(this.state.search);
    if (this.state.search !== "") {
      this.setState({
        searchRequested:true
      })

    }else {
      this.setState({
        searchRequested:false
      })
      
    }

     

    
  }



  onChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  render() {
  
  
  
    return (
      <div className='container'>
        <div className='title-center'>
        <h2 className='title'>Search Products</h2>

        <p>search for a product to create a review</p>
        </div>

        {this.context.searchedProducts.length === 0 && this.state.searchRequested && <div>Invalid Search</div>
           
           
          
          }
          
        <form onSubmit={this.onSubmit}>
          <div className='search-input' style={{}}>
          <input  style={{width:'1000px', marginRight:''}}
            onChange={this.onChange}
            placeholder="search"
            type="text"
            required
          />
          
          <button className='btn' style={{marginLeft:'20px'}}> Search</button>
           </div>

           


          {this.context.searchedProducts.map(product => {

            return (
              <div className='page'  className="products ">
              <li key={product.sku}>
                <img src={product.image}  />

                <div className='img-detail'>
                {product.name}
                
                <div style={{marginTop:''}}>
                <Link  to={`/reviews/create/${product.sku}`}>Add Review</Link>
                </div>
                </div>
              </li>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

