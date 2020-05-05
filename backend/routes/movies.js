const router = require('express').Router();
let Movie = require('../models/movie.model');

// Get Movies
router.route('/').get((req, res) => {

    // Retrieve list of movies
    Movie.find()
      .then(movies => res.json(movies))
      .catch(err => res.staus(400).json(`Error: ${err}`));
  });

// Add Movies
router
  .route('/add')
  .post((req, res) => {

    // Retreive movie details from client side
    const title = req.body.title;
    const synopsis = req.body.synopsis;
    const poster = req.body.poster;
    const genres = req.body.genres;

    //create a new movie instance with values
    const newMovie = new Movie({
      title,
      synopsis,
      poster,
      genres
    });

    // Add the movie to MongoDB
    newMovie.save()
      .then(() => res.json(`New movie has been added!`))
      .catch(err => res.status(400).json(`Error: ${err}`));

  })

  module.exports = router;