import types from '../actions/types';

function nodeReducer(state = {
  cache: {},
}, action) {
  let newCache = {};
  let cachePartial = {};
  console.log(action)
  switch (action.type) {
    case types.NODE.BATCH_UPDATE:
      action.nodes.forEach((node) => {
        cachePartial[node.id] = node;
      });
      newCache = Object.assign({}, state.cache, cachePartial);
      console.log(newCache)
      return Object.assign({}, state, { cache: newCache });
    default:
      return state
  }
}

export default nodeReducer;
