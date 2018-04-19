import { connect } from 'react-redux';
import PlanCreate from '../components/PlanCreate';

import {
  createPlan,
} from '../actions/workingPlanActions';
import {
  fetchPlanCreateData,
} from '../actions/fetchActions';

const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch, props) => ({
  createPlan: () => dispatch(createPlan(props.match.params.city)),
  fetchData: () => dispatch(fetchPlanCreateData(props.match.params.city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanCreate);
