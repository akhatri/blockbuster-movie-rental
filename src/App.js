// Core
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';

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
              <Route path="/add" component={AddMovie} />
              <Route path="/edit/:id" component={EditMovie} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
