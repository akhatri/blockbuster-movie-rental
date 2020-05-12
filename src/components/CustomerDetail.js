// Core
import React, { Component } from 'react';

// Services
import Axios from 'axios';

class CustomerDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      address: {},
    }

    // Event binding


  }

  // Lifecycle Hooks
  //-----------------

  componentDidMount() {

    let Id = this.props.match.params.id;

    Axios.get(`http://localhost:5000/customers/${Id}`)
      .then((res) => {
        console.log(res.data);

        // set state from Server data
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          address: res.data.address
        })

      })
      .catch(err => console.log(err));

  }

  // Click Events
  //-------------

  render() {

    return (
      <div>
        <h2 className="display-4 mb-5">Customer Details</h2>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.state.firstname} {this.state.lastname}</h5>
            <address>
              <p>{this.state.address.addressLine}</p>
              <p>{this.state.address.city}</p>
              <p>{this.state.address.postcode}</p>
              <p>E: {this.state.email}</p>
            </address>
            <p className="card-text"><strong>Address:</strong>{this.state.email}</p>
          </div>
        </div>

      </div>
    )
  }
}

export default CustomerDetail

