import types from '../actions/types';

function nodeReducer(state = {
  cache: {},
}, action) {
  let newCache = {};
  let cachePartial = {};
  switch (action.type) {
    case types.FETCH.LOAD_ALL:
    case types.NODE.BATCH_UPDATE:
      action.nodes.forEach((node) => {
        cachePartial[node.id] = Object.assign({}, node, {
          geojson: JSON.parse(node.geojson),
        });
      });
      newCache = Object.assign({}, state.cache, cachePartial);
      return Object.assign({}, state, { cache: newCache });
    default:
      return state
  }
}

export default nodeReducer;
