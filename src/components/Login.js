import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './Login.scss';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    }, () => console.log(this.state));

    
  }

  submitForm(e) {
    e.preventDefault();

    const { history } = this.props;

    localStorage.setItem('LoggedIn', true)

    history.push('/');

  }

  render() {

    let isLoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));

    if (isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <form className="form-signin" onSubmit={this.submitForm}>
        <img className="mb-4" src="../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="username" className="sr-only">Email address</label>
        <input type="text" name="username" className="form-control" value={this.state.username} placeholder="Username" required autoFocus onChange={this.handleInputChange} />
        <label htmlFor="password" className="sr-only">Password</label>
        <input type="password" name="password" className="form-control" value={this.state.password} placeholder="Password" required onChange={this.handleInputChange} />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
      </form>
    );
  }
}

export default Login;