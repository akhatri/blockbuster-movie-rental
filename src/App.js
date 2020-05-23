// Core
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Layouts
import BaseLayout from './layouts/Base';
import LoginLayout from './layouts/Login';

// Components
import Login from './components/Login';

import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';

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
      <Switch>

        <Route path="/login" exact>
          <LoginLayout>
            <Switch>
              <Route path="/login" component={Login} />
            </Switch>
          </LoginLayout>
        </Route>

        <Route>
          <BaseLayout>
            <Switch>
              <Route path="/" exact component={MovieList} />
              <Route path="/add-movie" component={AddMovie} />
              <Route path="/edit-movie/:id" component={EditMovie} />
              <Route path="/add-customer" component={AddCustomer} />
              <Route path="/customer-list" component={CustomerList} />
              <Route path="/edit-customer/:id" component={EditCustomer} />
              <Route path="/customer/:id" component={CustomerDetail} />
            </Switch>
          </BaseLayout>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
