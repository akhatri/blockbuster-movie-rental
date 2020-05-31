// Core
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Card from '../Card/Card';

// Services
import axios from 'axios';

class MovieList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filteredMovies: [],
      isLoading: true
    }

    // Event binding
    this.handleSearch = this.handleSearch.bind(this);

  }

  // Lifecycle methods
  //-------------------

  async componentDidMount() {

    const URI = `http://localhost:5000/movies`;

    try {

      // Get movie list from Server
      const result = await axios.get(URI);

      this.setState({
        movies: result.data,
        filteredMovies: result.data,
        isLoading: false
      })


    } catch (err) {

      console.log(err)
    }

  }

  // Click events
  //--------------

  handleSearch(e) {

    let searchTerm = e.target.value;

    const movies = [...this.state.movies];

    let filteredMovies = movies.filter((movie) => {

      let movieName = movie.title.toLowerCase();
      return movieName.includes(searchTerm);

    });

    this.setState({
      filteredMovies
    })

  }

  LoadingContainer() {

    return (
      <div>Loading...</div>
    )

  }


  render() {

    let isLoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));

    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }

    return (
      <div>

        <h2 className="display-4 mb-5">Movie Catalogue</h2>

        <div className="form-group mb-5">
          <input type="search" className="form-control form-control-lg" placeholder="Search Catalogue..." onChange={this.handleSearch} />
        </div>


        {
          this.state.isLoading ? <this.LoadingContainer /> :
            (
              <div className="row row-cols-1 row-cols-md-2">
                {

                  this.state.filteredMovies.length > 0 ? this.state.filteredMovies.map((movie) => {

                    return (
                      <div key={movie._id} className="col mb-4">
                        <Card type="allMovies" movie={movie} />
                      </div>
                    )
                  }) : (
                      <div class="alert alert-primary">No movies match your criteria</div>
                    )
                }
              </div>
            )
        }
      </div>
    )
  }
}

export default MovieList

