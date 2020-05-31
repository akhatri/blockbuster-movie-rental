// Core
import React, { Component } from 'react';

// Components
import Card from '../Card/Card';

// Services
import axios from 'axios';

class CustomerDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      address: {},
      rentedMovies: [],
      availableMovies: [],
      isLoading: true
    }

    // Event binding
    this.returnMovie = this.returnMovie.bind(this);


  }

  // Lifecycle Hooks
  //-----------------

  componentDidMount() {

    let Id = this.props.match.params.id;

    this.fetchCustomer(Id);
    this.fetchMovies(Id);

  }

  // Functions
  //----------

  async fetchCustomer(Id) {

    try {

      let res = await axios.get(`http://localhost:5000/customers/${Id}`);

      // set state from Server data
      this.setState({
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        email: res.data.email,
        address: res.data.address
      })

    } catch (err) {
      console.log(err);
    }

  }

  async fetchMovies(Id) {

    try {

      let res = await axios.get('http://localhost:5000/movies');

      const movies = res.data;
      let customerId = Id;

      const availableMovies = movies.filter((movie) => {

        if (!movie.rentalDetail) {
          return movie
        }

      });

      const rentedMovies = movies.filter((movie) => {
        if (movie.rentalDetail && movie.rentalDetail.customerId === customerId) {
          return movie
        }
      })

      this.setState({
        availableMovies: availableMovies,
        rentedMovies: rentedMovies,
        isLoading: false
      })

    } catch (err) {
      console.log(err);
    }

  }

  LoadingContainer() {

    return (
      <div>Loading...</div>
    )

  }

  // Click events
  //-------------

  returnMovie = (id) => (e) => {
    e.preventDefault();

    // Remove rental fields based on Movie Id
    axios.post(`http://localhost:5000/movies/remove-rental/${id}`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    window.location.reload();

  }

  render() {

    return (
      <div>
        <h2 className="display-4 mb-5">Customer Details</h2>

        <div className="row">
          <div className="col-5">
            <h5 className="mb-2">Contact Info</h5>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{this.state.firstname} {this.state.lastname}</h5>
                <address>
                  <p>{this.state.address.addressLine}</p>
                  <p>{this.state.address.city}</p>
                  <p>{this.state.address.postcode}</p>
                  <p>E: {this.state.email}</p>
                </address>
                <p className="card-text"><strong>Address:</strong>{this.state.email}</p>
              </div>
            </div>
          </div>
          <div className="col-7">
            <h5 className="mb-2">Movies rented</h5>
            {
              (
                <div className="row row-cols-1 row-cols-md-3">

                  {

                    this.state.rentedMovies.length > 0 ? this.state.rentedMovies.map((movie) => {

                      const { title, poster } = movie;

                      return (
                        <div key={movie._id} className="col mb-4">
                          <div className="card h-100">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-12">
                                  <img src={poster} className="img-fluid rounded" alt="Movie poster" />
                                </div>
                                <div className="col-12">
                                  <h5 className="mt-4 card-title">{title}</h5>
                                </div>
                              </div>
                              <button className="btn btn-sm btn-primary" onClick={this.returnMovie(movie._id)}>Return Movie</button>
                            </div>
                          </div>
                        </div>
                      )
                    }) : (
                        <div className="alert alert-primary">No movies rented</div>                        
                      )
                  }

                </div>
              )
            }
          </div>
        </div>

        <div>
          <h2 className="display-4 my-4">Available Movies to Rent</h2>

          {
            this.state.isLoading ? <this.LoadingContainer /> :
              (
                <div className="row row-cols-1 row-cols-md-2">
                  {

                    this.state.availableMovies.length > 0 ? this.state.availableMovies.map((movie) => {

                      // Create customer object
                      const customer = {
                        customerId: this.props.match.params.id,
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        email: this.state.email
                      }

    
                      return (
                        <div key={movie._id} className="col mb-4">
                          <Card type="availableMovies" movie={movie} customer={customer} />
                        </div>
                      )
                    }) : (
                        <div className="alert alert-primary">No movies available to rent</div>                        
                      )
                  }
                </div>
              )
          }
        </div>

      </div>
    )
  }
}

export default CustomerDetail

