import React from 'react';

const LoginLayout = ({ children }) => {
  return (
    <div className="App">
      <div className="site-container">
        <div className="site-content">
          <div className="container my-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout;
