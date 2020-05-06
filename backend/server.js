// Import Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

// Initialize App
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Start Server
app.listen(port, ()=> {
  console.log(`Server is listening on port: ${port}`);
});

// Server URI
const uri = process.env.ATLAS_URI;

// Mongoose Parameters
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Mongoose Connection
const connection = mongoose.connection;
connection.once('open', ()=> {
  console.log(`MongoDB database connection established successfully`);
});

// Setup Routes

// movies route
const moviesRouter = require('./routes/movies');
app.use('/movies', moviesRouter);

