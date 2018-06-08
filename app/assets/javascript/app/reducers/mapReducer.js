import types from '../actions/types';

function mapReducer(state = {
  hideMarkers: true,
}, action) {
  switch (action.type) {
    case types.MAP.SHOW_MARKERS:
      return Object.assign({}, state, { hideMarkers: false });
    case types.MAP.HIDE_MARKERS:
      return Object.assign({}, state, { hideMarkers: true });
    default:
      return state
  }
}

export default mapReducer;
