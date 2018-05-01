import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cityReducer from './cityReducer';
import contributorFormReducer from './contributorFormReducer';
import fetchReducer from './fetchReducer';
import nodeReducer from './nodeReducer';
import permitReducer from './permitReducer';
import planReducer from './planReducer';
import roadReducer from './roadReducer';
import userReducer from './userReducer';
import segmentReducer from './segmentReducer';
import loginFormReducer from './loginFormReducer';
import viewReducer from './viewReducer';
import workingPlanReducer from './workingPlanReducer';

const rootReducer = combineReducers({
  city: cityReducer,
  contributorForm: contributorFormReducer,
  fetch: fetchReducer,
  node: nodeReducer,
  permit: permitReducer,
  plan: planReducer,
  road: roadReducer,
  user: userReducer,
  segment: segmentReducer,
  loginForm: loginFormReducer,
  view: viewReducer,
  workingPlan: workingPlanReducer,
  router: routerReducer,
});

export default rootReducer;
