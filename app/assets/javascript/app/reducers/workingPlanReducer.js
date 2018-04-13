/**
 * The workingPlanReducer handles updates to a draft plan actively being edited
 * by the user.
 */

import types from './../actions/types';

const blankSegment = {
  version: 0,
  road_id: null,
  is_segment: false,
  is_orig_type_address: false,
  orig: null,
  is_dest_type_address: false,
  dest: null,
  crossStreetOptions: [],
  nodes: [],
  custom_nodes: {},
};

const blankTimeframe = {
  start: null,
  end: null,
  segments: [],
};

const clearEndpoints = {
  is_orig_type_address: false,
  orig: null,
  is_dest_type_address: false,
  dest: null,
  crossStreetOptions: [],
  nodes: [],
  custom_nodes: {},
};

const assignNewSegment = (state, action, newSegment) => {
  const currTimeframe = state.timeframes[action.timeframeIndex];
  return Object.assign({}, state, {
    timeframes: Object.assign([...state.timeframes], {
      [action.timeframeIndex]: Object.assign({}, currTimeframe, {
        segments: Object.assign([...currTimeframe.segments], {
          [action.segmentIndex]: newSegment,
        }),
      }),
    }),
    activeSegment: newSegment,
  });
};

const assignNewTimeframe = (state, action, newTimeframe) => {
  return Object.assign({}, state, {
    timeframes: Object.assign([...state.timeframes], {
      [action.timeframeIndex]: newTimeframe,
    }),
    activeSegment: null,
  });
};

function workingPlanReducer(state = {
  name: '',
  plan_type: 'NONE',
  timeframes: [Object.assign({}, blankTimeframe, {
    segments: [Object.assign({}, blankSegment)],
  })],
  activeSegment: null,
}, action) {
  const currTimeframe = typeof(action.timeframeIndex) !== 'undefined'
      ? state.timeframes[action.timeframeIndex] : null;
  const currSegment = typeof(action.segmentIndex) !== 'undefined'
      ? currTimeframe.segments[action.segmentIndex] : null;
  let newTimeframe;
  let newSegment;

  switch (action.type) {

    case types.WORKING_PLAN.NAME.CHANGE:
      return Object.assign({}, state, {
        name: action.name,
        activeSegment: null,
      });

    case types.WORKING_PLAN.PLAN_TYPE.CHANGE:
      return Object.assign({}, state, {
        plan_type: action.plan_type,
        activeSegment: null,
      });

    case types.WORKING_PLAN.TIMEFRAME.ADD:
      return Object.assign({}, state, {
        timeframes: state.timeframes.concat([
          Object.assign({}, blankTimeframe, {
            segments: [Object.assign({}, blankSegment)],
          }),
        ]),
        activeSegment: null,
      });

    case types.WORKING_PLAN.TIMEFRAME.REMOVE:
      return Object.assign({}, state, {
        timeframes: state.timeframes.slice(0, action.timeframeIndex)
            .concat(state.timeframes.slice(action.timeframeIndex + 1)),
        activeSegment: null,
      });

    case types.WORKING_PLAN.TIMEFRAME.START.CHANGE:
      newTimeframe = Object.assign({}, currTimeframe, {
        start: action.start,
      });
      return assignNewTimeframe(state, action, newTimeframe);

    case types.WORKING_PLAN.TIMEFRAME.END.CHANGE:
      newTimeframe = Object.assign({}, currTimeframe, {
        end: action.end,
      });
      return assignNewTimeframe(state, action, newTimeframe);

    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.ADD:
      newTimeframe = Object.assign({}, currTimeframe, {
        segments: currTimeframe.segments.concat([
          Object.assign({}, blankSegment),
        ]),
      });
      return assignNewTimeframe(state, action, newTimeframe);

    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.REMOVE:
      newTimeframe = Object.assign({}, currTimeframe, {
        segments: currTimeframe.segments.slice(0, action.segmentIndex)
            .concat(currTimeframe.segments.slice(action.segmentIndex + 1)),
      });
      return assignNewTimeframe(state, action, newTimeframe);

    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.IS_SEGMENT.CHANGE:
      newSegment = Object.assign({}, currSegment, clearEndpoints, {
        version: currSegment.version + 1,
        is_segment: action.is_segment,
      });
      return assignNewSegment(state, action, newSegment);

    // Update the base road for a segment and set the cross street options
    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.ROAD.CHANGE:
      newSegment = Object.assign({}, currSegment, clearEndpoints, {
        version: currSegment.version + 1,
        road_id: parseInt(action.road),
        crossStreetOptions: action.crossStreetOptions,
      });
      return assignNewSegment(state, action, newSegment);

    // Set the origin or destination of a segment and set the partial path
    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.END_POINT.CHANGE:
      newSegment = Object.assign({}, currSegment, {
        version: currSegment.version + 1,
        is_orig_type_address: action.is_orig_type_address,
        orig: action.orig,
        is_dest_type_address: action.is_dest_type_address,
        dest: action.dest,
        nodes: action.nodes,
        custom_nodes: action.custom_nodes,
      });
      return assignNewSegment(state, action, newSegment);

    default:
      return state
  }
}

export default workingPlanReducer;

