import { connect } from 'react-redux';
import PlanCreate from '../components/PlanCreate';

import {
  createPlan,
  updatePlan,
  deletePlan,
  cancelPlanForm,
} from '../actions/workingPlanActions';
import {
  fetchPlanCreateData,
} from '../actions/fetchActions';

const mapStateToProps = (state) => ({
  isPending: state.workingPlan.isPending,
  workingPlan: state.workingPlan,
});

const mapDispatchToProps = (dispatch, props) => ({
  deletePlan: (id) => dispatch(deletePlan(props.match.params.city, id)),
  createPlan: () => dispatch(createPlan(props.match.params.city)),
  updatePlan: () => dispatch(updatePlan(props.match.params.city)),
  cancel: () => dispatch(cancelPlanForm(props.match.params.city)),
  fetchData: () => dispatch(fetchPlanCreateData(props.match.params.city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanCreate);
