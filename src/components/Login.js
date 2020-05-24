import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './Login.scss';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {
        username: '',
        password: ''
      }
    }

    // Event binding
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);

  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  validateCredentials() {

    let errors = this.state.errors;
    let formIsValid = true;

    // Username
    if (this.state.username !== 'admin') {

      errors.username = 'Username is not valid!';

      console.log(errors.username);

      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          username: errors.username
        }
      }));

      formIsValid = false;

    } else {

      // Reset state with empty values
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          username: ''
        }
      }))

    }

    // Password
    if (this.state.password !== 'admin') {

      errors.password = 'Password is not valid!';

      console.log(errors.password);

      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          password: errors.password
        }
      }));

      formIsValid = false;

    } else {

      // Reset state with empty values
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          password: ''
        }
      }))

    }

    return formIsValid;


  }

  submitForm(e) {
    e.preventDefault();

    if (this.validateCredentials()) {

      console.log('Form is valid')
      const { history } = this.props;
      localStorage.setItem('LoggedIn', true)
      history.push('/');

    } else {
      console.log('Form is invalid');
    }

  }

  render() {

    let isLoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));

    if (isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <form className="form-signin" onSubmit={this.submitForm}>

        <img src="logo.svg" alt="logo" className="img-fluid w-75 mx-auto d-block mb-4" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <label htmlFor="username" className="sr-only">Email address</label>
        <input type="text" name="username" className={`form-control ${this.state.errors.username.length > 0 ? 'is-invalid' : ''}`} value={this.state.username} placeholder="Username" required autoFocus onChange={this.handleInputChange} />
        <div className="invalid-feedback">{this.state.errors.username}</div>

        <label htmlFor="password" className="sr-only">Password</label>
        <input type="password" name="password" className={`form-control ${this.state.errors.password.length > 0 ? 'is-invalid' : ''}`} value={this.state.password} placeholder="Password" required onChange={this.handleInputChange} />
        <div className="invalid-feedback">{this.state.errors.password}</div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2020</p>

      </form>
    );
  }
}

export default Login;