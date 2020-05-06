// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Services
import Axios from 'axios';

class MovieList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: []
    }

    // Event binding
    this.deleteMovie = this.deleteMovie.bind(this);

  }

  // Lifecycle Methods
  //-------------------

  componentDidMount() {

    // Get movie list from Server
    Axios.get('http://localhost:5000/movies')
      .then((res) => {
        console.log(res.data);

        this.setState({
          movies: res.data
        })

      })
      .catch((err) => console.log(err));
  }

  // Click Events
  //--------------

  deleteMovie = (id) => (e) => {

    e.preventDefault();

    // Delete movie - send selected id to server
    Axios.delete(`http://localhost:5000/movies/delete/${id}`)
    window.location.reload();

  }

  render() {
    return (
      <div>
        <h2 className="display-4 mb-5">Movie Catalogue</h2>
        <div className="row row-cols-1 row-cols-md-2">

          {
            this.state.movies.map((movie) => {

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
                      <Link className="btn btn-sm btn-warning mr-2" to={`/edit/${movie._id}`}>Edit</Link>
                      <button className="btn btn-sm btn-danger" onClick={this.deleteMovie(movie._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    )
  }
}

export default MovieList

