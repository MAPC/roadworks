import React from 'react';
import { Link } from 'react-router-dom';

import AbstractForm from './abstract/AbstractForm';
import TextField from './fields/TextField';


class LoginForm extends AbstractForm {

  validate(props) {
    const { email, password } = this.props.loginForm;

    if (email === null || email === '')  {
      this.markInvalid('email');
    }

    if (
      password === null
      || password.length < 6
    ) {
      this.markInvalid('password');
    }
  }

  formDidValidate() {
    const { login, loginForm: { email , password } } = this.props;
    login(email, password);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.redirect(this.props.redirectTo);
    }
  }

  render() {
    return (
      <form className="component LoginForm" data-form={this.formId} onSubmit={this.submit}>
        <div className="form-box">
          <h2>
            Municipal Login
            <Link to={window.location.pathname}>X Close</Link>
          </h2>

          <div className="fields">
            <div className="field">
              <label htmlFor="email">Email</label>
              <TextField
                value={this.props.loginForm.email}
                name="email"
                placeholder="Enter email ..."
                onChange={this.props.onEmailChange}
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <TextField
                value={this.props.loginForm.password}
                type="password"
                name="password"
                placeholder="Enter password ..."
                onChange={this.props.onPasswordChange}
              />
            </div>
          </div>

          <button
            className="styled primary"
            data-action="submit"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    );
  }

}

export default LoginForm;
