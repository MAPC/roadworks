import types from './types';
import { decodeId } from '../util/id';

export function toggleActive(id) {
  return {
    type: types.VIEW.TOGGLE_ACTIVE,
    id,
  };
}

export function toggleAllPlans() {
  return {
    type: types.VIEW.TOGGLE_ALL_PLANS,
  };
}

export function togglePlan(id) {
  return {
    type: types.VIEW.TOGGLE_PLAN,
    id,
  };
}

export function toggleAllPermitTypes() {
  return {
    type: types.VIEW.TOGGLE_ALL_PERMIT_TYPES,
  };
}

export function togglePermitType(permitType) {
  return {
    type: types.VIEW.TOGGLE_PERMIT_TYPE,
    permitType,
  };
}

export function toggleDetails() {
  return {
    type: types.VIEW.TOGGLE_DETAILS,
  };
}

export function setPermitDetails(id) {
  return (dispatch, getState) => {
    console.log(id);
    return dispatch({
      type: types.VIEW.SET_DETAILS,
      title: '',
      subtitle: '',
      rows: [],
    });
  };
}

export function setSegmentDetails(id) {
  return (dispatch, getState) => {
    const ids = decodeId(id);
    const plan = getState().plan.cache[ids.planId];
    const timeframe = plan.timeframes[ids.timeframeIndex];
    const segment = timeframe.segments[ids.segmentIndex];
    const road = getState().road.cache[segment.road_id];

    const getCrossStreetName = () => 'TBD';

    const location = ((segment, road) => {
      if (segment.is_segment) {
        const orig = segment.is_orig_type_address
            ? `#${segment.custom_nodes[segment.orig].address}`
            : getCrossStreetName(segment.orig);
        const dest = segment.is_dest_type_address
            ? `#${segment.custom_nodes[segment.dest].address}`
            : getCrossStreetName(segment.dest);
        return `${road.name} from ${orig} to ${dest}`;
      }
      return road.name;
    })(segment, road);

    const rows = [{
      label: 'Plan',
      value: plan.name,
    }, {
      label: 'Activity',
      value: plan.plan_type,
    }, {
      label: 'Estimated Start Date',
      value: timeframe.start,
    }, {
      label: 'Estimated End Date',
      value: timeframe.end,
    }, {
      label: 'Location',
      value: location,
    }];
    return dispatch({
      type: types.VIEW.SET_DETAILS,
      title: plan.name,
      subtitle: plan.plan_type,
      rows: [],
    });
  };
}
