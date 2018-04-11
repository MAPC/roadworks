import { connect } from 'react-redux';
import PlanCreate from '../components/PlanCreate';

import {
  createPlan,
} from '../actions/workingPlanActions';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  createPlan: () => dispatch(createPlan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanCreate);
