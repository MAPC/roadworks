import types from '../actions/types';

function cityReducer(state = {
  cache: {},
}, action) {
  switch (action.type) {
    case types.CITY.UPDATE:
      const cachePartial = {};
      cachePartial[action.city.name] = Object.assign({}, action.city, {
        geojson: JSON.parse(action.city.geojson),
        mask: JSON.parse(action.city.mask),
        centroid: JSON.parse(action.city.centroid),
        bounds: JSON.parse(action.city.bounds),
      });
      const newCache = Object.assign({}, state.cache, cachePartial);
      return Object.assign({}, state, { cache: newCache });
    default:
      return state
  }
}

export default cityReducer;
