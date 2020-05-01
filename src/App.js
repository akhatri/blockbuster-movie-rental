// Core
import React from 'react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Bootstrap JS
import 'bootstrap';

// Styles
import './global.scss'; // we use a custom version of Bootstrap 4 with optional imports

function App() {
  return (
    <div className="App">
      <div className="site-container">
        <Header />
        <div className="site-content">
          <div className="container my-5">
            <button className="btn btn-primary">Button</button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
