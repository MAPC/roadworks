import { connect } from 'react-redux';
import PlanForm from '../components/PlanForm';

import {
  planNameChange,
  planTypeChange,
  planTimeframeAdd,
} from '../actions/workingPlanActions';

const mapStateToProps = (state, props) => {
  return {
    name: state.workingPlan.name,
    type: state.workingPlan.plan_type,
    timeframeIndicies: state.workingPlan.timeframes.reduce((arr, tf, idx) =>
      tf._destroy ? arr : arr.concat([idx])
    , []),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onPlanNameChange: (name) => dispatch(planNameChange(name)),
    onPlanTypeChange: (type) => dispatch(planTypeChange(type)),
    addTimeframe: () => dispatch(planTimeframeAdd()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm);
