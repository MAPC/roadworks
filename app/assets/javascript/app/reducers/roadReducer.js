import types from '../actions/types';

function roadReducer(state = {
  cache: {},
}, action) {
  switch (action.type) {
    case types.ROAD.BATCH_UPDATE:
      const cachePartial = {};
      action.roads.forEach(road => cachePartial[road.id] = road);
      const newCache = Object.assign({}, state.cache, cachePartial);
      return Object.assign({}, state, { cache: newCache });
    default:
      return state
  }
}

export default roadReducer;
