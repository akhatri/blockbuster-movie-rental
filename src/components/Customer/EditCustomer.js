// Core
import React, { Component } from 'react';

// Services
import axios from 'axios';

class EditCustomer extends Component {

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
    this.submiCustomer = this.submiCustomer.bind(this);

  }

  // Lifecycle methods
  //------------------

  componentDidMount() {

    let Id = this.props.match.params.id;

    this.fetchCustomer(Id);

  }

  // Functions
  //----------

  async fetchCustomer(Id) {

    const URI = `http://localhost:5000/customers/${Id}`;

    try {

      let res = axios.get(URI);

      // set state from Server data
      this.setState({
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        email: res.data.email,
        address: {
          addressLine: res.data.address.addressLine,
          city: res.data.address.city,
          postcode: res.data.address.postcode
        }
      })


    } catch (err) {
      console.log(err);
    }

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

  }


  async submiCustomer(e) {
    e.preventDefault();

    const customer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      address: {
        addressLine: this.state.address.addressLine,
        city: this.state.address.city,
        postcode: this.state.address.city
      }
    }

    try {

      let response = await axios.post(`http://localhost:5000/customers/update/${this.props.match.params.id}`, customer)
      console.log(response);

    } catch (err) {
      console.log(err);
    }

    window.location.href = '/customer-list';

  }


  render() {

    return (
      <div>
        <h2 className="display-4 mb-5">Edit Customer Details {this.props.match.params.id}</h2>

        <form onSubmit={this.submiCustomer}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstname">First Name</label>
              <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" name="addressLine" value={this.state.address.addressLine} onChange={this.handleAddressChange} />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
              <input type="text" className="form-control" name="city" value={this.state.address.city} onChange={this.handleAddressChange} />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="postcode">Postcode</label>
              <input type="text" className="form-control" name="postcode" value={this.state.address.postcode} onChange={this.handleAddressChange} />
            </div>
          </div>
          <button type="submit" className="btn btn-lg btn-primary">Edit Customer</button>
        </form>


      </div>
    )
  }
}

export default EditCustomer

