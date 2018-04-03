import { connect } from 'react-redux';
import PlanForm from '../components/PlanForm';

import {
  updateSegmentRoad,
  updateSegmentEndPoint,
  removeSegment,
  addSegment,
} from '../actions/workingPlanActions';

const mapStateToProps = (state, props) => {
  return {
    segments: state.workingPlan.segments,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  // parse
  return {

    removeSegment: (segment) => dispatch(removeSegment(segment)),
    addSegment: (segment) => dispatch(addSegment(segment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm);
