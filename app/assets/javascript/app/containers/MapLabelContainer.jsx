import { connect } from 'react-redux';
import MapLabel from '../components/MapLabel';
import {
  setSegmentDetails,
  setPermitDetails,
} from '../actions/viewActions';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => props.type == 'plan'
      ? dispatch(setSegmentDetails(props.id))
      : dispatch(setPermitDetails(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapLabel);
