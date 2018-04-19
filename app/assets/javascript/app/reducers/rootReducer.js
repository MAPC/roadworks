import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cityReducer from './cityReducer';
import fetchReducer from './fetchReducer';
import nodeReducer from './nodeReducer';
import permitReducer from './permitReducer';
import planReducer from './planReducer';
import roadReducer from './roadReducer';
import segmentReducer from './segmentReducer';
import viewReducer from './viewReducer';
import workingPlanReducer from './workingPlanReducer';

const rootReducer = combineReducers({
  city: cityReducer,
  fetch: fetchReducer,
  node: nodeReducer,
  permit: permitReducer,
  plan: planReducer,
  road: roadReducer,
  segment: segmentReducer,
  view: viewReducer,
  workingPlan: workingPlanReducer,
  router: routerReducer,
});

export default rootReducer;
