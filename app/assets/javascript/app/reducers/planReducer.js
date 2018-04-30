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
    case types.PLAN.REMOVE:
      cachePartial = Object.values(state.cache).reduce((cache, plan) =>
        plan.id == action.id
            ? cache
            : Object.assign({}, cache, { [plan.id]: plan })
      , {});
      return Object.assign({}, state, { cache: cachePartial });
    default:
      return state
  }
}

export default planReducer;
