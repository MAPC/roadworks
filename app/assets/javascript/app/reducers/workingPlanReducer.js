/**
 * The workingPlanReducer handles updates to a draft plan actively being edited
 * by the user.
 */

import types from './../actions/types';

function workingPlanReducer(state = {
  segments: [{
    version: 0,
    road: null,
    is_orig_type_address: false,
    orig: null,
    is_dest_type_address: false,
    dest: null,
    crossStreetOptions: [],
    nodes: [],
    custom_nodes: {},
  }],
  activeSegment: null,
}, action) {
  let newSegment = {};
  let newCustomNodes = {};
  switch (action.type) {
    // Update the base road for a segment and set the cross street options
    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.ROAD.UPDATE:
      newSegment = Object.assign({}, state.segments[action.index], {
        version: state.segments[action.index].version + 1,
        road: action.road,
        is_orig_type_address: false,
        orig: null,
        is_dest_type_address: false,
        dest: null,
        crossStreetOptions: action.crossStreetOptions,
        nodes: [],
        custom_nodes: {},
      });
      return Object.assign({}, state, {
        segments: Object.assign([...state.segments], {
          [action.index]: newSegment,
        }),
        activeSegment: action.index,
      });
    // Set the origin or destination of a segment and set the partial path
    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.END_POINT.UPDATE:
      newCustomNodes = Object.assign(
        {},
        state.segments[action.index].custom_nodes,
        action.custom_nodes
      );
      newSegment = Object.assign({}, state.segments[action.index], {
        version: state.segments[action.index].version + 1,
        is_orig_type_address: action.is_orig_type_address,
        orig: action.orig,
        is_dest_type_address: action.is_dest_type_address,
        dest: action.dest,
        nodes: action.nodes,
        custom_nodes: newCustomNodes,
      });
      return Object.assign({}, state, {
        segments: Object.assign([...state.segments], {
          [action.index]: newSegment,
        }),
        activeSegment: action.index,
      });
    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.END_POINT_TYPE.UPDATE:
      newSegment = Object.assign({}, state.segments[action.index], {
        version: state.segments[action.index].version + 1,
        is_orig_type_address: action.is_orig_type_address,
        orig: action.orig,
        is_dest_type_address: action.is_dest_type_address,
        dest: action.dest,
        nodes: action.nodes,
        custom_nodes: action.custom_nodes,
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

