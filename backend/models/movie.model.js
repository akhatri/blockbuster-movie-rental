// Import Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Schema Model - similar to database tables in a relational DBMS
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  synopsis: {
    type: String,
    required: true,
    trim: true
  },
  poster: {
    data: Buffer,
    type: String
  },
  genres: {
    type: Array,
    required: true,
    trim: true
  },

}, { timestamps: true });

// Create/Instantiate the Model
const Movie = mongoose.model('Movie', movieSchema);

// Export as a module
module.exports = Movie;