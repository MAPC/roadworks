import types from '../actions/types';

function planReducer(state = {
  cache: {},
}, action) {
  let newCache;
  let cachePartial;
  switch (action.type) {
    case types.FETCH.LOAD_ALL:
    case types.PLAN.BATCH_UPDATE:
      cachePartial = {};
      action.plans.forEach(plan => cachePartial[plan.id] = plan);
      newCache = Object.assign({}, state.cache, cachePartial);
      return Object.assign({}, state, { cache: newCache });
    default:
      return state
  }
}

export default planReducer;
