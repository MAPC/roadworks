import types from '../actions/types';

function permitReducer(state = {
  cache: {},
}, action) {
  let newCache;
  let cachePartial;
  switch (action.type) {
    case types.FETCH.LOAD_ALL:
      cachePartial = {};
      action.permits.forEach((permit) => {
        cachePartial[permit.id] = Object.assign({}, permit, {
          geojson: JSON.parse(permit.geojson),
        });
      });
      newCache = Object.assign({}, state.cache, cachePartial);

      return Object.assign({}, state, { cache: newCache });
    default:
      return state
  }
}

export default permitReducer;
