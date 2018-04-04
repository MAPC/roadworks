import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import nodeReducer from './nodeReducer';
import planReducer from './planReducer';
import roadReducer from './roadReducer';
import segmentReducer from './segmentReducer';
import workingPlanReducer from './workingPlanReducer';

const rootReducer = combineReducers({
  node: nodeReducer,
  plan: planReducer,
  road: roadReducer,
  segment: segmentReducer,
  workingPlan: workingPlanReducer,
  router: routerReducer,
});

export default rootReducer;
