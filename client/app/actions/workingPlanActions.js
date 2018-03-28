import api from './api';
import types from './types';
import {
  updateNodes,
} from './nodeActions';

// Recursively generate a path between two nodes
const path = (nodeMap, visited, origId, destId) => {
  const base = [origId];
  const newVisited = visited.concat(base)
  if (origId == destId) {
    return base;
  } else {
    const children = nodeMap[origId].neighbors.filter(id => !newVisited.includes(id) && nodeMap[id]);
    for (let i = 0; i < children.length; i++) {
      const childPath = path(nodeMap, newVisited, children[i], destId);
      if (childPath) {
        return base.concat(childPath);
      }
    }
    return null;
  }

}

// Generate a partial node map using the nodes from a particular road
const generateRoadNodeMap = (road, nodeCache) => {
  const nodeMap = {};
  road.nodes.forEach((nodeId) => {
    nodeMap[nodeId] = nodeCache[nodeId];
  });
  return nodeMap;
};

// Calculate the options for cross streets on a particular road
const generateCrossStreetOptions = (road, nodeMap, roadMap) => {
  const nodeIds = road.nodes;
  // Check all of the nodes (even when most of the nodes will not be x-streets)
  const options = nodeIds.reduce((opts, id) => {
    const node = nodeMap[id];
    const roads = node.part_of.filter(id => id != road.id);
    if (roads.length == 1) {
      // If there's only one connecting road, this could be a town line
      const crossRoad = roadMap[roads[0]];
      const label = crossRoad
          ? (crossRoad.name || 'UNNAMED ROAD')
          : 'Town Line';
      return opts.concat({ value: id, label });
    } else if (roads.length > 1) {
      // If there are many cross streets for a particular node, string them
      // together to display to the user
      const label = roads.slice(1).reduce(
        (acc, id) => `${acc} and ${roadMap[id].name || 'UNNAMED ROAD'}`,
      (roadMap[roads[0]].name || 'UNNAMED ROAD'));
      return opts.concat({ value: id, label });
    } else if (node.neighbors.length == 1) {
      // If there are no cross streets for this node, and the node has exactly
      // one neighbor, we must be at the end of the road
      const label = 'End of Road';
      return opts.concat({ value: id, label });
    }
    return opts;
  }, []);
  return options;
};

// Update the base road for a segment and generate cross street options
export function updateSegmentRoad(segmentIndex, roadId) {
  return async (dispatch, getState) => {
    const state = getState();
    const availableNodes = Object.keys(state.node.cache);
    const road = state.road.cache[roadId];
    const neededNodes = road.nodes.filter(id => !availableNodes.includes(id));
    // If there are nodes that the client does not yet have, they must be
    // fetched
    if (neededNodes.length) {
      const response = await api.getNodes(neededNodes);
      const result = await response.json();
      dispatch(updateNodes(result.data));
    }
    const nodeCache = getState().node.cache;
    const roadCache = getState().road.cache;
    const crossStreetOptions = generateCrossStreetOptions(
      road,
      nodeCache,
      roadCache
    );
    dispatch({
      type: types.WORKING_PLAN.SEGMENT.ROAD.UPDATE,
      index: segmentIndex,
      road: roadId,
      crossStreetOptions,
    });
  };
}

export function updateSegmentEndPointType(segmentIndex, type, isOrigin) {
  return (dispatch, getState) => {
    const segment = getState().workingPlan.segments[segmentIndex];
    let orig, dest, origType, destType, partialPath;
    if (isOrigin) {
      origType = type;
      orig = null;
      destType = segment.destType;
      dest = segment.dest;
      partialPath = [dest];
    } else {
      origType = segment.origType;
      orig = segment.orig;
      destType = type;
      dest = null;
      partialPath = [orig];
    }
    return dispatch({
      type: types.WORKING_PLAN.SEGMENT.END_POINT_TYPE.UPDATE,
      index: segmentIndex,
      origType,
      orig,
      destType,
      dest,
      partialPath: [],
    });
  };
}

// Update an end point for a segment and generate the partial path
export function updateSegmentEndPoint(segmentIndex, nodeId, isOrigin) {
  return (dispatch, getState) => {
    const state = getState();
    const segment = state.workingPlan.segments[segmentIndex];
    let orig = null;
    let dest = null;
    let partialPath = [];
    if (isOrigin) {
      orig = nodeId;
      dest = segment.dest;
    } else {
      orig = segment.orig;
      dest = nodeId;
    }
    if (orig && dest) {
      // If we have both an origin and destination, we can find the partial path
      const road = state.road.cache[segment.road];
      const partialNodeCache = generateRoadNodeMap(road, state.node.cache);
      partialPath = path(partialNodeCache, [], orig, dest) || [];
    } else {
      // If not, we can still plot a dot at the starting/ending location
      partialPath = [nodeId];
    }
    dispatch({
      type: types.WORKING_PLAN.SEGMENT.END_POINT.UPDATE,
      index: segmentIndex,
      orig,
      dest,
      partialPath,
    });
  };
}

export function removeSegment(segment) {

}

export function addSegment(segment) {

}
