/**
 * The workingPlanReducer handles updates to a draft plan actively being edited
 * by the user.
 */

import types from './../actions/types';

function workingPlanReducer(state = {
  segments: [{
    road: null,
    orig: null,
    dest: null,
    crossStreetOptions: [],
    partialPath: [],
  }],
  activeSegment: null,
}, action) {
  let newSegment = {};
  const newSegments = Array.from(state.segments);
  switch (action.type) {
    // Update the base road for a segment and set the cross street options
    case types.WORKING_PLAN.SEGMENT.ROAD.UPDATE:
      newSegment = Object.assign({}, state.segments[action.index], {
        road: action.road,
        orig: null,
        dest: null,
        crossStreetOptions: action.crossStreetOptions,
        partialPath: [],
      });
      newSegments[action.index] = newSegment;
      return Object.assign({}, state, {
        segments: Array.from(newSegments),
        activeSegment: action.index,
      });
    // Set the origin or destination of a segment and set the partial path
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

