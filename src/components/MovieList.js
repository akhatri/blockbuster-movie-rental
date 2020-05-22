// Core
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Services
import Axios from 'axios';

class MovieList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filteredMovies: [],
      isLoading: true
    }

    // Event binding
    this.deleteMovie = this.deleteMovie.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.logout = this.logout.bind(this);

  }

  // Lifecycle Methods
  //-------------------

  componentDidMount() {

    // Get movie list from Server
    Axios.get('http://localhost:5000/movies')
      .then((res) => {

        this.setState({
          movies: res.data,
          filteredMovies: res.data,
          isLoading: false
        })

      })
      .catch((err) => console.log(err));
  }

  // Click Events
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

    console.log(this.state.movies);
    console.log(filteredMovies);


  }

  deleteMovie = (id) => (e) => {

    e.preventDefault();

    // Delete movie - send selected id to server
    Axios.delete(`http://localhost:5000/movies/delete/${id}`)
    window.location.reload();

  }

  LoadingContainer() {

    return (
      <div>Loading...</div>
    )

  }

  logout(e) {
    e.preventDefault();

    const { history } = this.props;

    localStorage.removeItem('LoggedIn');

    history.push('/login');

  }

  render() {

    let isLoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));

    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <button className="btn btn-primary" type="submit" onClick={this.logout}>Logout</button>

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

                    const { title, synopsis, poster, genres } = movie;

                    return (
                      <div key={movie._id} className="col mb-4">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-4">
                                <img src={poster} className="img-fluid rounded" alt="Movie poster" />
                              </div>
                              <div className="col-8">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{synopsis}</p>
                                <div className="mb-2">
                                  {
                                    genres.map((genre, index, array) => {

                                      // Add margin to items except last item
                                      let marginClass;
                                      if (array.length - 1 !== index) {
                                        marginClass = 'mr-2';
                                      } else {
                                        marginClass = '';
                                      }

                                      return (
                                        <span key={index} className={`badge badge-primary ${marginClass}`}>{genre}</span>
                                      )

                                    })
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-footer">
                            <Link className="btn btn-sm btn-warning mr-2" to={`/edit-movie/${movie._id}`}>Edit</Link>
                            <button className="btn btn-sm btn-danger" onClick={this.deleteMovie(movie._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    )
                  }) : (
                      <p>No movies match your criteria</p>
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

