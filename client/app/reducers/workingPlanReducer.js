/**
 * The workingPlanReducer handles updates to a draft plan actively being edited
 * by the user.
 */

import enums from './../constants/enums';
import types from './../actions/types';

function workingPlanReducer(state = {
  segments: [{
    road: null,
    origType: enums.SEGMENT_END_POINT_TYPES.NODE,
    orig: null,
    destType: enums.SEGMENT_END_POINT_TYPES.NODE,
    dest: null,
    crossStreetOptions: [],
    partialPath: [],
    customNodes: {},
  }],
  activeSegment: null,
}, action) {
  let newSegment = {};
  let newCustomNodes = {};
  switch (action.type) {
    // Update the base road for a segment and set the cross street options
    case types.WORKING_PLAN.SEGMENT.ROAD.UPDATE:
      newSegment = Object.assign({}, state.segments[action.index], {
        road: action.road,
        origType: enums.SEGMENT_END_POINT_TYPES.NODE,
        orig: null,
        destType: enums.SEGMENT_END_POINT_TYPES.NODE,
        dest: null,
        crossStreetOptions: action.crossStreetOptions,
        partialPath: [],
        customNodes: {},
      });
      return Object.assign({}, state, {
        segments: Object.assign([...state.segments], {
          [action.index]: newSegment,
        }),
        activeSegment: action.index,
      });
    // Set the origin or destination of a segment and set the partial path
    case types.WORKING_PLAN.SEGMENT.END_POINT.UPDATE:
      newCustomNodes = Object.assign(
        {},
        state.segments[action.index].customNodes,
        action.customNodes
      );
      newSegment = Object.assign({}, state.segments[action.index], {
        origType: action.origType,
        orig: action.orig,
        destType: action.destType,
        dest: action.dest,
        partialPath: action.partialPath,
        customNodes: newCustomNodes,
      });
      return Object.assign({}, state, {
        segments: Object.assign([...state.segments], {
          [action.index]: newSegment,
        }),
        activeSegment: action.index,
      });
    case types.WORKING_PLAN.SEGMENT.END_POINT_TYPE.UPDATE:
      newSegment = Object.assign({}, state.segments[action.index], {
        origType: action.origType,
        orig: action.orig,
        destType: action.destType,
        dest: action.dest,
        partialPath: action.partialPath,
        customNodes: {},
      });
      return Object.assign({}, state, {
        segments: Object.assign([...state.segments], {
          [action.index]: newSegment,
        }),
        activeSegment: action.index,
      });
    default:
      return state
  }
}

export default workingPlanReducer;

