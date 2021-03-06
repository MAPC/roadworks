import { connect } from 'react-redux';
import Viewer from '../components/Viewer';

import { logout } from '../actions/sessionActions';

const mapStateToProps = (state, props) => ({
  loggedIn: !!state.user.id,
  user: state.user.cache[state.user.id],
});

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
