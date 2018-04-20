import types from './types';
import {
  decodeId
} from '../util/id';
import {
  getCrossStreetName
} from '../util/segment';

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
    const state = getState();
    const permit = state.permit.cache[id];

    const rows = Object.keys(permit.application_data).reduce((rows, label) => {
      const value = permit.application_data[label];
      if (value) {
        const adjusted = value.split('<br>').filter((line) => line).join(', ');
        return rows.concat([{
          label,
          value: adjusted,
        }]);
      }
      return rows;
    }, []);

    return dispatch({
      type: types.VIEW.SET_DETAILS,
      title: '',
      subtitle: '',
      rows,
    });
  };
}

export function setSegmentDetails(id) {
  return (dispatch, getState) => {
    const ids = decodeId(id);
    const state = getState();
    const plan = state.plan.cache[ids.planId];
    const timeframe = plan.timeframes[ids.timeframeIndex];
    const segment = timeframe.segments[ids.segmentIndex];
    const roadCache = state.road.cache;
    const nodeCache = state.node.cache;
    const road = roadCache[segment.road_id];

    const location = ((segment, road, roadCache, nodeCache) => {
      if (segment.is_segment) {
        const orig = segment.is_orig_type_address
            ? `#${segment.custom_nodes[segment.orig].address}`
            : getCrossStreetName(nodeCache[segment.orig], road.id, roadCache);
        const dest = segment.is_dest_type_address
            ? `#${segment.custom_nodes[segment.dest].address}`
            : getCrossStreetName(nodeCache[segment.dest], road.id, roadCache);
        return `${road.name} from ${orig} to ${dest}`;
      }
      return road.name;
    })(segment, road, roadCache, nodeCache);

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
      title: road.name,
      subtitle: plan.plan_type,
      rows,
    });
  };
}
