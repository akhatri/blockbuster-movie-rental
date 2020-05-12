// Import Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Schema Model - similar to database tables in a relational DBMS
const customerSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },  
  email: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: Object,
    required: true,
    trim: true
  },

}, { timestamps: true });

// Create/Instantiate the Model
const Customer = mongoose.model('Customer', customerSchema);

// Export as a module
module.exports = Customer;