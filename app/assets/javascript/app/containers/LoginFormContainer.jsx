import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';

import { 
  onEmailChange,
  onPasswordChange,
  loginUser,
} from '../actions/loginActions';

const mapStateToProps = state => state.loginForm;

const mapDispatchToProps = dispatch => ({
  onEmailChange: (email) => dispatch(onEmailChange(email)),
  onPasswordChange: (password) => dispatch(onPasswordChange(password)),
  login: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
