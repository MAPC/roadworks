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
    focusedRoad: newSegment.road_id,
  });
};

const assignNewTimeframe = (state, action, newTimeframe, incSegVersion) => {
  const newSegments = incSegVersion
      ? newTimeframe.segments.map((s) =>
          Object.assign({}, s, { version: s.version + 1 }))
      : newTimeframe.segments;

  return Object.assign({}, state, {
    timeframes: Object.assign([...state.timeframes], {
      [action.timeframeIndex]:
          Object.assign({}, newTimeframe, { segments: newSegments }),
    }),
    focusedRoad: null,
  });
};

function workingPlanReducer(state = {
  name: '',
  plan_type: 'NONE',
  timeframes: [Object.assign({}, blankTimeframe, {
    workingId: 0,
    segments: [Object.assign({}, blankSegment, {
      workingId: 1,
    })],
  })],
  focusedRoad: null,
  nextWorkingId: 2,
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
        focusedRoad: null,
      });

    case types.WORKING_PLAN.PLAN_TYPE.CHANGE:
      return Object.assign({}, state, {
        plan_type: action.plan_type,
        focusedRoad: null,
      });

    case types.WORKING_PLAN.TIMEFRAME.ADD:
      return Object.assign({}, state, {
        timeframes: state.timeframes.concat([
          Object.assign({}, blankTimeframe, {
            workingId: state.nextWorkingId,
            segments: [Object.assign({}, blankSegment, {
              workingId: state.nextWorkingId + 1,
            })],
          }),
        ]),
        focusedRoad: null,
        workingId: state.nextWorkingId + 2,
      });

    case types.WORKING_PLAN.TIMEFRAME.REMOVE:
      if (currTimeframe.id) {
        newTimeframe = Object.assign({}, currTimeframe, {
          segments: currTimeframe.segments.map((s) =>
              Object.assign({}, s, { _destroy: true })),
          _destroy: true,
        });
        return assignNewTimeframe(state, action, newTimeframe);
      }
      return Object.assign({}, state, {
        timeframes: state.timeframes.slice(0, action.timeframeIndex)
            .concat(state.timeframes.slice(action.timeframeIndex + 1)),
        focusedRoad: null,
      });

    case types.WORKING_PLAN.TIMEFRAME.START.CHANGE:
      newTimeframe = Object.assign({}, currTimeframe, {
        start: action.start,
      });
      return assignNewTimeframe(state, action, newTimeframe, true);

    case types.WORKING_PLAN.TIMEFRAME.END.CHANGE:
      newTimeframe = Object.assign({}, currTimeframe, {
        end: action.end,
      });
      return assignNewTimeframe(state, action, newTimeframe);

    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.ADD:
      newTimeframe = Object.assign({}, currTimeframe, {
        segments: currTimeframe.segments.concat([
          Object.assign({}, blankSegment, {
            workingId: state.nextWorkingId,
          }),
        ]),
      });
      return Object.assign({}, assignNewTimeframe(state, action, newTimeframe), {
        nextWorkingId: state.nextWorkingId + 1,
      });

    case types.WORKING_PLAN.TIMEFRAME.SEGMENT.REMOVE:
      if (currSegment.id) {
        newSegment = Object.assign({}, currSegment, {
          _destroy: true,
        });
        return assignNewSegment(state, action, newSegment);
      }
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

    case types.WORKING_PLAN.LOAD_EXISTING_PLAN:
      return Object.assign({}, state, action.plan, {
        nextWorkingId: action.nextWorkingId,
      });
    default:
      return state
  }
}

export default workingPlanReducer;

