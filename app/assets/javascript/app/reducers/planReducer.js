import types from '../actions/types';

function planReducer(state = {
  cache: {},
}, action) {
  let newCache;
  switch (action.type) {
    case types.PLAN.UPDATE:
      newCache = Object.assign({}, state.cache, {
        [action.plan.id]: action.plan,
      });
      return Object.assign({}, state, { cache: newCache });
    default:
      return state
  }
}

export default planReducer;
