import { connect } from 'react-redux';
import Header from '../components/Header';

import { logout } from '../actions/sessionActions';

const mapStateToProps = (state, props) => ({
  loggedIn: !!state.user.id,
  user: state.user.cache[state.user.id],
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
