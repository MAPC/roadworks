import { connect } from 'react-redux';
import PlanCreate from '../components/PlanCreate';

import {
  createPlan,
} from '../actions/workingPlanActions';

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch, props) => ({
  createPlan: () => dispatch(createPlan(props.match.params.city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanCreate);
