import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginForm from '../components/LoginForm';

import {
  onEmailChange,
  onPasswordChange,
  login,
} from '../actions/sessionActions';


const mapStateToProps = state => ({
  loggedIn: !!state.user.id,
  loginForm: state.loginForm,
  user: state.user,
  redirectTo: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  onEmailChange: (email) => dispatch(onEmailChange(email)),
  onPasswordChange: (password) => dispatch(onPasswordChange(password)),
  login: (email, password) => dispatch(login(email, password)),
  redirect: (to) => dispatch(push(to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
