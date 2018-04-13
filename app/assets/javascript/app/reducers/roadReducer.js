import types from '../actions/types';

function roadReducer(state = {
  cache: {},
}, action) {
  switch (action.type) {
    case types.FETCH.LOAD_ALL:
    case types.ROAD.BATCH_UPDATE:
      const cachePartial = {};
      action.roads.forEach((road) => {
        cachePartial[road.id] = Object.assign({}, road, {
          geojson: JSON.parse(road.geojson)
        });
      });
      const newCache = Object.assign({}, state.cache, cachePartial);
      return Object.assign({}, state, { cache: newCache });
    default:
      return state
  }
}

export default roadReducer;
