import { connect } from 'react-redux';
import MapLabel from '../components/MapLabel';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch({type: 'TEST'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapLabel);
