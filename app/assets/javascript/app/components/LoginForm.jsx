import React from 'react';
import { Link } from 'react-router-dom';

import AbstractForm from './abstract/AbstractForm';
import TextField from './fields/TextField';


class LoginForm extends AbstractForm {

  validate(props) {
    if (props.email === null || props.email === '')  {
      this.markInvalid('email');
    }

    if (
      props.password === null 
      || props.password.length < 6
    ) {
      this.markInvalid('password');
    }
  }

  formDidValidate() {
    const { login, email, password } = this.props;
    login(email, password);
  }

  render() {
    return (
      <section className="component LoginForm" data-form={this.formId}>
        <div className="form-box">
          <h2>
            Municipal Login

            <Link to={window.location.pathname}>X Close</Link>
          </h2>

          <div className="fields">
            <div className="field">
              <label htmlFor="email">Email</label>
              <TextField 
                value={this.props.email} 
                name="email" 
                placeholder="Enter email ..." 
                onChange={this.props.onEmailChange} 
                debounce={500}
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <TextField 
                value={this.props.password}
                type="password" 
                name="password" 
                placeholder="Enter password ..." 
                onChange={this.props.onPasswordChange} 
                debounce={500}
              />
            </div>
          </div>

          <button className="styled primary" data-action="submit" onClick={this.submit}>Login</button>
        </div>
      </section>
    );
  }

}

export default LoginForm;
