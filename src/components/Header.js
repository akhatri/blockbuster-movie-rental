// Core
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand" style={{ 'width': '125px' }} >
          <img className="img-fluid" src="logo.svg" alt="Logo"></img>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/add-movie">Add Movie</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/edit-movie/999">Edit Movie</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/customer-list">Customer List</Link>
            </li>              
            <li className="nav-item">
              <Link className="nav-link" to="/add-customer">Add Customer</Link>
            </li>            
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;