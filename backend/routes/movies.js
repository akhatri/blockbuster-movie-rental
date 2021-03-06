const router = require('express').Router();
let Movie = require('../models/movie.model');

// Get Movies
router.route('/').get((req, res) => {

  // Retrieve list of movies
  Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.staus(400).json(`Error: ${err}`));
});

// Get Movie by Id
router
  .route('/:id')
  .get((req, res) => {

    // Get Movie Id
    const Id = req.params.id;

    // Retreive movie details by Id
    Movie.findById(Id)
      .then(movie => res.json(movie))
      .catch(err => res.status(400).json(`Error ${err}`));

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

// Edit Movie
router
  .route('/update/:id')
  .post((req, res) => {

    // Get Movie Id
    const Id = req.params.id;

    // Get Movie details by Id
    Movie.findById(Id)
      .then((movie) => {

        // Update Movie details
        movie.title = req.body.title;
        movie.synopsis = req.body.synopsis;
        movie.poster = req.body.poster;
        movie.genres = req.body.genres;

        // Save the selected movie with updated details
        movie.save()
          .then(() => res.json(`Movie has been updated!`))
          .catch(err => res.status(400).json(`Error: ${err}`))

      })
      .catch(err => res.status(400).json(`Error: ${err}`));

  })

// Delete Movie
router
  .route('/delete/:id')
  .delete((req, res) => {

    // Get Movie Id
    const Id = req.params.id;

    // Find and delete movie based on id
    Movie.findByIdAndDelete(Id)
      .then(() => res.json(`Movie has been deleted`))
      .catch((err) => res.status(400).json(`Error ${err}`));

  });

// Add Rental Details to Specific Movie
router
  .route('/add-rental/:id')
  .post((req, res) => {

    // Get Movie Id
    const Id = req.params.id;
    const rentalDetail = req.body;

    console.log(Id);
    console.log(req.body);

    Movie.update({ "_id": Id }, {
      $set: {
        rentalDetail: rentalDetail
      },
      upsert: true
    })
      .then(() => res.json(`Movie has been rented`))
      .catch((err) => res.status(400).json(`Error ${err}`))

  });

// Remove Rental Details to Specific Movie
router
  .route('/remove-rental/:id')
  .post((req, res) => {

    // Get Movie Id
    const Id = req.params.id;

    Movie.update({ "_id": Id }, {
      $unset: {
        rentalDetail: ""
      }
    })
      .then(() => res.json(`Movie has been made available`))
      .catch((err) => res.status(400).json(`Error ${err}`))

  });  

module.exports = router;

