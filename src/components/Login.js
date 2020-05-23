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
        password: '',
        isInvalidUsername: false,
        isInvalidPassword: false,
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

  submitForm(e) {
    e.preventDefault();

    const { history } = this.props;

    if (this.state.username !== 'admin') {

      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          username: 'Invalid username',
          isInvalidUsername: true,
        }

      }), () => {

        console.log(this.state.errors.isInvalidUsername);

      })

    } else {

      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          isInvalidUsername: false
        }
      }))

    }

    if (this.state.password !== 'admin') {

      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          password: 'Invalid password',
          isInvalidPassword: true,
        }
      }), () => {

        console.log(this.state.errors.isInvalidPassword);

      })

    } else {

      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          isInvalidPassword: false
        }
      }))

    }

    if (this.state.username === 'admin' && this.state.password === 'admin') {

      localStorage.setItem('LoggedIn', true)
      history.push('/');

    } else {
      this.setState({
        errorState: true
      })
    }

  }

  render() {

    let isLoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));

    if (isLoggedIn) {
      return <Redirect to="/" />
    }

    // Error classes
    let invalidUsername = this.state.errors.isInvalidUsername ? 'is-invalid' : '';
    let isInvalidPassword = this.state.errors.isInvalidPassword ? 'is-invalid' : '';

    return (
      <form className="form-signin" onSubmit={this.submitForm}>

        <img src="logo.svg" alt="logo" className="img-fluid w-75 mx-auto d-block mb-4" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <label htmlFor="username" className="sr-only">Email address</label>
        <input type="text" name="username" className={`form-control ${invalidUsername}`} value={this.state.username} placeholder="Username" required autoFocus onChange={this.handleInputChange} />
        <div className="invalid-feedback">{this.state.errors.username}</div>

        <label htmlFor="password" className="sr-only">Password</label>
        <input type="password" name="password" className={`form-control ${isInvalidPassword}`} value={this.state.password} placeholder="Password" required onChange={this.handleInputChange} />
        <div className="invalid-feedback">{this.state.errors.password}</div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2020</p>

      </form>
    );
  }
}

export default Login;