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
    onSegmentRoadChange: (id, value) => dispatch(updateSegmentRoad(id, value)),
    onSegmentOrigChange: (id, value) => dispatch(updateSegmentEndPoint(id, value, true)),
    onSegmentDestChange: (id, value) => dispatch(updateSegmentEndPoint(id, value, false)),

    removeSegment: (segment) => dispatch(removeSegment(segment)),
    addSegment: (segment) => dispatch(addSegment(segment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm);
