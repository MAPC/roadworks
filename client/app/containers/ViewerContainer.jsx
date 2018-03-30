import { connect } from 'react-redux';
import Viewer from '../components/Viewer';

import { fetchRoads } from '../actions/roadActions';

const mapStateToProps = (state, props) => state;

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchRoads() {
      dispatch(fetchRoads('ayer')) 
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
