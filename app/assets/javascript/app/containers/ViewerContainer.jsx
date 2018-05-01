import { connect } from 'react-redux';
import Viewer from '../components/Viewer';

import { fetchRoads } from '../actions/roadActions';
import { fetchCity } from '../actions/cityActions';
import { logout } from '../actions/sessionActions';
import { fetchPlans } from '../actions/planActions';
import { fetchNodes } from '../actions/nodeActions';

const mapStateToProps = (state, props) => ({
  loggedIn: !!state.user.id,
  user: state.user.cache[state.user.id],
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
