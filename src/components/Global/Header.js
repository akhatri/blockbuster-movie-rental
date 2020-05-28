// Core
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {

  let history = useHistory();

  // Click events
  //--------------

  const logout = (event) => {
    event.preventDefault();

    // clear local storage
    localStorage.removeItem('LoggedIn');

    // route to login page
    history.push('/login');

  }

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
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/add-movie">Add Movie</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customer-list">Customer List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-customer">Add Customer</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button className="btn btn-primary" type="submit" onClick={logout}>Logout</button>
          </form>
        </div>
      </nav>
    </header>
  )
}

export default Header;