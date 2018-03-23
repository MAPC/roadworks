import { connect } from 'react-redux';
import PlanForm from '../components/PlanForm';

import {
  updateSegment,
} from '../actions/workingPlanActions';

const mapStateToProps = (state, props) => {
  return {
    segments: state.workingPlan.segments,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  // parse
  return {
    onSegmentChange: (id, value) => dispatch(updateSegment(id, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm);
