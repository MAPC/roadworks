import { connect } from 'react-redux';
import PlanForm from '../components/PlanForm';

import {
  planNameChange,
  planTypeChange,
  planRemoveTimeframe,
  planAddTimeframe,
} from '../actions/workingPlanActions';

const mapStateToProps = (state, props) => {
  return {
    name: state.workingPlan.name,
    type: state.workingPlan.plan_type,
    timeframeIndicies: Array.from(state.workingPlan.timeframes.keys()),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onPlanNameChange: (name) => dispatch(planNameChange(name)),
    onPlanTypeChange: (type) => dispatch(planTypeChange(type)),
    removeTimeframe: (index) => dispatch(planRemoveTimeframe(index)),
    addTimeframe: () => dispatch(planAddTimeframe()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm);
