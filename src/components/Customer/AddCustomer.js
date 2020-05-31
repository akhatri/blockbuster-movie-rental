// Core
import React, { Component } from 'react';

// Services
import axios from 'axios';

class AddCustomer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      address: {
        addressLine: '',
        city: '',
        postcode: ''
      }
    }

    // Event binding
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.submitForm = this.submitForm.bind(this);

  }

  // Click events
  //-------------

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log(this.state);

  }

  handleAddressChange(e) {

    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState(prevState => ({
      address: {
        ...prevState.address,
        [name]: value
      }
    }))

    console.log(this.state);

  }

  async submitForm(e) {
    e.preventDefault();

    const customer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      address: {
        addressLine: this.state.address.addressLine,
        city: this.state.address.city,
        postcode: this.state.address.postcode
      }
    }

    try {

      let response = await axios.post('http://localhost:5000/customers/add', customer);
      console.log(response);

    } catch (err) {
      console.log(err);
    }

    window.location.href = '/customer-list';

  }


  render() {
    return (
      <div>
        <h2 className="display-4 mb-5">Add a Customer</h2>

        <form onSubmit={this.submitForm}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstname">First Name</label>
              <input type="text" className="form-control" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" className="form-control" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.handleInputChange} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" placeholder="abc@example.com" value={this.state.email} onChange={this.handleInputChange} required/>
          </div>          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" name="addressLine" placeholder="1234 Main St" value={this.state.address.addressLine} onChange={this.handleAddressChange} required/>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
              <input type="text" className="form-control" name="city" value={this.state.address.city} onChange={this.handleAddressChange} required/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="postcode">Postcode</label>
              <input type="text" className="form-control" name="postcode" value={this.state.address.postcode} onChange={this.handleAddressChange} required/>
            </div>
          </div>
          <button type="submit" className="btn btn-lg btn-primary">Add Customer</button>
        </form>

      </div>
    )
  }
}

export default AddCustomer

