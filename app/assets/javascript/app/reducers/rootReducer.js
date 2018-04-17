import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cityReducer from './cityReducer';
import nodeReducer from './nodeReducer';
import planReducer from './planReducer';
import roadReducer from './roadReducer';
import userReducer from './userReducer';
import segmentReducer from './segmentReducer';
import loginFormReducer from './loginFormReducer';
import workingPlanReducer from './workingPlanReducer';

const rootReducer = combineReducers({
  city: cityReducer,
  node: nodeReducer,
  plan: planReducer,
  road: roadReducer,
  user: userReducer,
  segment: segmentReducer,
  loginForm: loginFormReducer,
  workingPlan: workingPlanReducer,
  router: routerReducer,
});

export default rootReducer;
