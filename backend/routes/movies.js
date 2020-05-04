const router = require('express').Router();
let Movie = require('../models/movie.model');

router
  .route('/')
  .get((req, res) => {
    Movie.find()
      .then(movies => res.json(movies))
      .catch(err => res.staus(400).json(`Error: ${err}`));
  });