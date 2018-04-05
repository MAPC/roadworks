import { connect } from 'react-redux';
import Viewer from '../components/Viewer';

import { fetchRoads } from '../actions/roadActions';
import { fetchCity } from '../actions/cityActions';

const mapStateToProps = (state, props) => state;

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchRoads: () => dispatch(fetchRoads(props.match.params.city)),
    fetchCity: () => dispatch(fetchCity(props.match.params.city)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
