import { combineReducers } from 'redux';
import planReducer from './planReducer';

const rootReducer = combineReducers({
  plan: planReducer,
});

export default rootReducer;
