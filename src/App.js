// Core
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Movies
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';

// Customers
import AddCustomer from './components/AddCustomer';
import CustomerList from './components/CustomerList';
import EditCustomer from './components/EditCustomer';
import CustomerDetail from './components/CustomerDetail';

// Bootstrap JS
import 'bootstrap';

// Styles
import './global.scss'; // we use a custom version of Bootstrap 4 with optional imports

function App() {
  return (
    <Router>
      <div className="App">
        <div className="site-container">
          <Header />
          <div className="site-content">
            <div className="container my-5">
              <Route path="/" exact component={MovieList} />
              <Route path="/add-movie" component={AddMovie} />
              <Route path="/edit-movie/:id" component={EditMovie} />
              <Route path="/add-customer" component={AddCustomer} />
              <Route path="/customer-list" component={CustomerList} />
              <Route path="/edit-customer/:id" component={EditCustomer} />
              <Route path="/customer/:id" component={CustomerDetail} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
