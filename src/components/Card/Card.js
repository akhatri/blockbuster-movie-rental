import React from 'react';
import { Link } from 'react-router-dom';

// Services
import axios from 'axios';

const Card = (props) => {

  // De-structure props
  const { title, synopsis, poster, genres, _id } = props.movie;

  // Click events
  //-------------

  const deleteMovie = (id) => (e) => {

    e.preventDefault();
    console.log('clicked', id);
    axios.delete(`http://localhost:5000/movies/delete/${id}`)

    window.location.reload();

  }

  const rentMovie = (id) => (e) => {
    e.preventDefault();

    const { customerId, firstname, lastname, email } = props.customer;

    const rentalDetail = {
      customerId,
      firstname,
      lastname,
      email
    }

    // // Add fields based on Movie Id
    axios.post(`http://localhost:5000/movies/add-rental/${id}`, rentalDetail)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    window.location.reload();

  }

  let cardActions;

  if (props.type === 'allMovies') {

    cardActions = (
      <>
        <Link className="btn btn-sm btn-warning mr-2" to={`/edit-movie/${_id}`}>Edit</Link>
        <button className="btn btn-sm btn-danger" onClick={deleteMovie(_id)}>Delete</button>
      </>
    )

  } else if (props.type === 'availableMovies') {

    cardActions = (
      <>
        <button className="btn btn-sm btn-success" onClick={rentMovie(_id)}>Rent Movie</button>
      </>
    )
  }


  return (
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
        {cardActions}
      </div>
    </div>

  )
}

export default Card
