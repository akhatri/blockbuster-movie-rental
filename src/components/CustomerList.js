// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Services
import Axios from 'axios';

class CustomerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      customers: []
    }

    // Event binding
    this.deleteCustomer = this.deleteCustomer.bind(this);

  }

  // Lifecycle Methods
  //-------------------

  componentDidMount() {

    // Get customer list from Server
    Axios.get('http://localhost:5000/customers')
      .then((res) => {
        console.log(res.data);

        this.setState({
          customers: res.data
        })

      })
      .catch((err) => console.log(err));
  }

  // Click Events
  //--------------

  deleteCustomer = (id) => (e) => {

    e.preventDefault();

    // Delete customer - send selected id to server
    Axios.delete(`http://localhost:5000/customers/delete/${id}`)

    window.location.href = '/customer-list';


  }

  render() {
    return (
      <div>
        <h2 className="display-4 mb-5">Customer List</h2>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.customers.map( (customer, index) => {
                return(
                  <tr key={customer._id}>
                    <td>
                      <Link to={`/customer/${customer._id}`}>{customer.firstname} {customer.lastname}</Link>
                    </td>
                    <td>
                      <Link className="btn btn-warning mr-3" to={`/edit-customer/${customer._id}`}>Edit</Link>
                      <button className="btn btn-danger" onClick={this.deleteCustomer(customer._id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default CustomerList

