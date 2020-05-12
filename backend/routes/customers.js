const router = require('express').Router();
let Customer = require('../models/customer.model');

// Get Customers
router.route('/').get((req, res) => {

  // Retrieve list of customers
  Customer.find()
    .then(customers => res.json(customers))
    .catch(err => res.staus(400).json(`Error: ${err}`));
});

// Get Customer by Id
router
  .route('/:id')
  .get((req, res) => {

    // Get Customer Id
    const Id = req.params.id;    

    // Retreive customer details by Id
    Customer.findById(Id)
      .then(customer => res.json(customer))
      .catch(err => res.status(400).json(`Error ${err}`));

  });

// Add Customers
router
  .route('/add')
  .post((req, res) => {

    // Retreive customer details from client side
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const address = req.body.address;

    //create a new customer instance with values
    const newCustomer = new Customer({
      firstname,
      lastname,
      email,
      address
    });

    // Add the customer to MongoDB
    newCustomer.save()
      .then(() => res.json(`New customer has been added!`))
      .catch(err => res.status(400).json(`Error: ${err}`));

  })

// Edit Customer
router
  .route('/update/:id')
  .post( (req, res) => {

    // Get Customer Id
    const Id = req.params.id;

    // Get Customer details by Id
    Customer.findById(Id)
      .then( (customer) => {

        // Update Customer details
        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
        customer.email = req.body.email;
        customer.address = req.body.address;

        // Save the selected customer with updated details
        customer.save()
          .then( () => res.json(`Customer has been updated!`))
          .catch(err => res.status(400).json(`Error: ${err}`))

      })
      .catch( err => res.status(400).json(`Error: ${err}`));

  } )

// Delete Customer
router
  .route('/delete/:id')
  .delete((req, res) => {

    // Get Customer Id
    const Id = req.params.id;

    // Find and delete customer based on id
    Customer.findByIdAndDelete(Id)
      .then(() => res.json(`Customer has been deleted`))
      .catch((err) => res.status(400).json(`Error ${err}`));

  });

module.exports = router;