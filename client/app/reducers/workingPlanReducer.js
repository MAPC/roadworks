import types from './../actions/types';

function workingPlanReducer(state = {
  segments: [{
    road: null,
    origCrossStreet: null,
    destCrossStreet: null,
    nodes: [],
  }],
  activeSegment: null,
}, action) {
  const newSegments = Array.from(state.segments);
  switch (action.type) {
    case types.WORKING_PLAN.SEGMENT.UPDATE:
      newSegments[action.index] = action.segment;
      return Object.assign({}, state, {
        segments: Array.from(newSegments),
        activeSegment: action.index,
      });
    default:
      return state
  }
}

export default workingPlanReducer;
