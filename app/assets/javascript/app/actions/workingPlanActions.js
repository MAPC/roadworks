import { push } from 'react-router-redux';

import api from './api';
import types from './types';
import utils from './utils';
import {
  updateNodes,
} from './nodeActions';
import {
  updatePlans,
  removePlan,
} from './planActions';
import {
  partialNodeCacheForRoad,
  generateCrossStreetOptions,
  createCustomNode,
  path,
} from '../util/segment';

/* Plan level actions ------------------------------------------------------- */

export function planNameChange(name) {
  return {
    type: types.WORKING_PLAN.NAME.CHANGE,
    name,
  };
}

export function planTypeChange(type) {
  return {
    type: types.WORKING_PLAN.PLAN_TYPE.CHANGE,
    plan_type: type,
  };
}

export function planTimeframeRemove(index) {
  return {
    type: types.WORKING_PLAN.TIMEFRAME.REMOVE,
    timeframeIndex: index,
  };
}

export function planTimeframeAdd(index) {
  return {
    type: types.WORKING_PLAN.TIMEFRAME.ADD,
  };
}

/* Timeframe level actions -------------------------------------------------- */

export function timeframeStartChange(index, date) {
  return {
    type: types.WORKING_PLAN.TIMEFRAME.START.CHANGE,
    timeframeIndex: index,
    start: date,
  };
}

export function timeframeEndChange(index, date) {
  return {
    type: types.WORKING_PLAN.TIMEFRAME.END.CHANGE,
    timeframeIndex: index,
    end: date,
  };
}

export function timeframeSegmentAdd(timeframeIndex) {
  return {
    type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.ADD,
    timeframeIndex,
  };
}

export function timeframeSegmentRemove(timeframeIndex, segmentIndex) {
  return {
    type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.REMOVE,
    timeframeIndex,
    segmentIndex,
  };
}

/* Segment level actions ---------------------------------------------------- */

// Update the base road for a segment and generate cross street options
export function updateSegmentRoad(timeframeIndex, segmentIndex, roadId) {
  return async (dispatch, getState) => {
    const state = getState();
    if (!roadId) {
      return dispatch({
        type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.ROAD.CHANGE,
        timeframeIndex,
        segmentIndex,
        road: null,
        crossStreetOptions: [],
      });
    }
    const availableNodes = Object.keys(state.node.cache);
    const road = state.road.cache[roadId];
    const neededNodes = road.nodes.filter(id => !availableNodes.includes(id));
    // If there are nodes that the client does not yet have, they must be
    // fetched
    if (neededNodes.length) {
      const nodes = await api.getNodes(neededNodes);
      dispatch(updateNodes(nodes));
    }
    const nodeCache = getState().node.cache;
    const roadCache = getState().road.cache;
    const crossStreetOptions = generateCrossStreetOptions(
      road,
      nodeCache,
      roadCache
    );
    dispatch({
      type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.ROAD.CHANGE,
      timeframeIndex,
      segmentIndex,
      road: roadId,
      crossStreetOptions,
    });
  };
}

export function updateSegmentType(timeframeIndex, segmentIndex, is_segment) {
  return {
    type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.IS_SEGMENT.CHANGE,
    timeframeIndex,
    segmentIndex,
    is_segment,
  };
}

export function updateSegmentEndPointType(
  timeframeIndex,
  segmentIndex,
  type,
  isOrigin
) {

  return (dispatch, getState) => {
    const segment = getState().workingPlan.timeframes[timeframeIndex]
        .segments[segmentIndex];
    let orig, dest, is_orig_type_address, is_dest_type_address, nodes, custom_nodes;
    if (isOrigin) {
      is_orig_type_address = type;
      orig = null;
      is_dest_type_address = segment.is_dest_type_address;
      dest = segment.dest;
      nodes = dest ? [dest] : [];
      custom_nodes = Object.assign({}, segment.custom_nodes, { [-1]: null });
    } else {
      is_orig_type_address = segment.is_orig_type_address;
      orig = segment.orig;
      is_dest_type_address = type;
      dest = null;
      nodes = orig ? [orig] : [];
      custom_nodes = Object.assign({}, segment.custom_nodes, { [-2]: null });
    }
    return dispatch({
      type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.END_POINT.CHANGE,
      timeframeIndex,
      segmentIndex,
      is_orig_type_address,
      orig,
      is_dest_type_address,
      dest,
      nodes,
      custom_nodes,
    });
  };
}

// Update an end point for a segment and generate the partial path
export function updateSegmentEndPoint(
  timeframeIndex,
  segmentIndex,
  value,
  isOrigin
) {
  return async (dispatch, getState) => {
    const state = getState();
    const segment = state.workingPlan.timeframes[timeframeIndex]
        .segments[segmentIndex];
    const partialNodeCache = partialNodeCacheForRoad(
      state.road.cache[segment.road_id],
      state.node.cache
    );

    const newEndpoints = await (async (nodeCache, segment, road, value, isOrigin) => {
      if ((isOrigin && !segment.is_orig_type_address) ||
          (!isOrigin && !segment.is_dest_type_address)) {
        return {
          orig: (isOrigin ? value : segment.orig),
          dest: (isOrigin ? segment.dest : value),
          custom_nodes: segment.custom_nodes || {},
        };
      }
      const nodeId = isOrigin ? -1 : -2;
      const location = await api.geocodeToLngLat(`${value} ${road.name}, ${road.city_name}, MA`);
      const customNode = createCustomNode(
        partialNodeCache,
        location,
        value
      );
      return {
        orig: isOrigin ? -1 : segment.orig,
        dest: isOrigin ? segment.dest : -2,
        custom_nodes: Object.assign({}, segment.custom_nodes, {
          [nodeId]: Object.assign({}, { id: nodeId }, customNode),
        }),
      };
    })(partialNodeCache, segment, state.road.cache[segment.road_id], value, isOrigin);

    const newNodes = ((nodeCache, newEndpoints) => {
      if (!newEndpoints.orig || !newEndpoints.dest) {
        return [newEndpoints.orig || newEndpoints.dest];
      }
      const start = segment.is_orig_type_address
          ? newEndpoints.custom_nodes[newEndpoints.orig].neighbors
          : [newEndpoints.orig];
      const end = segment.is_dest_type_address
          ? newEndpoints.custom_nodes[newEndpoints.dest].neighbors
          : [newEndpoints.dest];
      const nodePath = path(
        nodeCache,
        [],
        start,
        end
      );
      return (segment.is_orig_type_address ? [newEndpoints.orig] : [])
          .concat(nodePath)
          .concat(segment.is_dest_type_address ? [newEndpoints.dest] : []);
    })(partialNodeCache, newEndpoints);

    return dispatch({
      type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.END_POINT.CHANGE,
      timeframeIndex,
      segmentIndex,
      is_orig_type_address: segment.is_orig_type_address,
      is_dest_type_address: segment.is_dest_type_address,
      nodes: newNodes,
      orig: newEndpoints.orig,
      dest: newEndpoints.dest,
      custom_nodes: newEndpoints.custom_nodes,
    });
  };
}

export function loadExistingPlan(id, url) {
  return async (dispatch, getState) => {
    const plan = getState().plan.cache[id];

    const neededNodes = ((state) => {
      const nodeCache = state.node.cache;
      const roadCache = state.road.cache;
      return plan.timeframes.filter((tf) => !tf._destroy).reduce((nodes, tf) =>
        nodes.concat(tf.segments.filter((tf) => !tf._destroy).reduce((nodes, sg) => (
          roadCache[sg.road_id]
              ? nodes.concat(roadCache[sg.road_id].nodes)
              : nodes
          ), [])
        ), []).filter((id) => !nodeCache[id]);
    })(getState());

    if (neededNodes.length) {
      const nodes = await api.getNodes(neededNodes);
      dispatch(updateNodes(nodes));
    }
    const nodeCache = getState().node.cache;
    const roadCache = getState().road.cache;
    let nextWorkingId = getState().workingPlan.nextWorkingId;
    const timeframes = plan.timeframes.map((timeframe) => {
      const segments = timeframe.segments.map((segment) => {
        const newSegment = Object.assign({}, segment, {
          workingId: nextWorkingId,
          version: 0,
          crossStreetOptions: generateCrossStreetOptions(
            roadCache[segment.road_id],
            nodeCache,
            roadCache
          ),
        });
        nextWorkingId += 1;
        return newSegment;
      })
      const newTimeframe = Object.assign({}, timeframe, {
        workingId: nextWorkingId,
        segments,
      });
      nextWorkingId += 1;
      return newTimeframe;
    });
    dispatch({
      type: types.WORKING_PLAN.LOAD_EXISTING_PLAN,
      plan: Object.assign({}, plan, { timeframes }),
      nextWorkingId,
    });
    return dispatch(push(url));
  };
}

export function updatePlan(city) {
  return async (dispatch, getState) => {
    const workingPlan = getState().workingPlan;
    const newPlan = await api.updatePlan(workingPlan, true, city.toUpperCase());
    if (newPlan) {
      dispatch(updatePlans([newPlan]));
      dispatch(push(`/${city}`));
    }
  };
}

export function workingPlanSetPending(isPending) {
  return {
    type: types.WORKING_PLAN.SET_PENDING,
    isPending,
  };
}

export function workingPlanReset() {
  return {
    type: types.WORKING_PLAN.RESET,
  };
}

export function createPlan(city) {
  return async (dispatch, getState) => {
    dispatch(workingPlanSetPending(true));
    const workingPlan = getState().workingPlan;
    const newPlan = await api.createPlan(
      workingPlan,
      true,
      city.toUpperCase().replace(/-/g, ' ')
    );
    if (newPlan) {
      dispatch(updatePlans([newPlan]));
      dispatch(push(`/${city}`));
      dispatch(workingPlanReset());
    }
    return dispatch(workingPlanSetPending(false));
  };
}

export function deletePlan(city, id) {
  return async (dispatch, getState) => {
    dispatch(workingPlanSetPending(true));
    const deletedPlan = await api.deletePlan(id);
    if (deletedPlan) {
      dispatch(removePlan(id));
      dispatch(push(`/${city}`));
      dispatch(workingPlanReset());
    }
    return dispatch(workingPlanSetPending(false));
  };
}

