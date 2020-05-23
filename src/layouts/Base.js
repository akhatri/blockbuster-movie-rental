import React from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

const BaseLayout = ({ children }) => {
  return (
    <div className="App">
      <div className="site-container">
        <Header />
        <div className="site-content">
          <div className="container my-5">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default BaseLayout;
