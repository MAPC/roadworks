import types from './../actions/types';

function workingPlanReducer(state = {
  segments: [{
    road: null,
    orig: null,
    dest: null,
    crossStreetNodeMap: {},
    partialPath: [],
  }],
  activeSegment: null,
}, action) {
  let newSegment = {};
  const newSegments = Array.from(state.segments);
  switch (action.type) {
    case types.WORKING_PLAN.SEGMENT.ROAD.UPDATE:
      newSegment = Object.assign({}, state.segments[action.index], {
        road: action.road,
        crossStreetNodeMap: action.crossStreetNodeMap,
        partialPath: [],
      });
      newSegments[action.index] = newSegment;
      return Object.assign({}, state, {
        segments: Array.from(newSegments),
        activeSegment: action.index,
      });
    case types.WORKING_PLAN.SEGMENT.END_POINT.UPDATE:
      newSegment = Object.assign({}, state.segments[action.index], {
        orig: action.orig,
        dest: action.dest,
        partialPath: action.partialPath,
      });
      newSegments[action.index] = newSegment;
      return Object.assign({}, state, {
        segments: Array.from(newSegments),
        activeSegment: action.index,
      });
    default:
      return state
  }
}

export default workingPlanReducer;

