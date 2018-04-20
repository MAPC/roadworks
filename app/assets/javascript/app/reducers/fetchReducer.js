import types from '../actions/types';

function fetchReducer(state = {
  isPending: false,
}, action) {
  switch (action.type) {
    case types.FETCH.SET_PENDING:
      return Object.assign({}, state, { isPending: true });
    case types.FETCH.LOAD_ALL:
      return Object.assign({}, state, { isPending: false });
    default:
      return state
  }
}

export default fetchReducer;
