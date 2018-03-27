import api from './api';
import types from './types';
import {
  updateNodes,
} from './nodeActions';

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

const generateRoadNodeMap = (road, nodeCache) => {
  const nodeMap = {};
  road.nodes.forEach((nodeId) => {
    nodeMap[nodeId] = nodeCache[nodeId];
  });
  return nodeMap;
};

const generateCrossStreetOptions = (road, nodeMap, roadMap) => {
  const nodeIds = road.nodes;
  const options = nodeIds.reduce((opts, id) => {
    const node = nodeMap[id];
    const roads = node.part_of.filter(id => id != road.id);
    if (roads.length == 1) {
      const crossRoad = roadMap[roads[0]];
      const label = crossRoad
          ? (crossRoad.name || 'UNNAMED ROAD')
          : 'Town Line';
      return opts.concat({ value: id, label });
    } else if (roads.length > 1) {
      const label = roads.slice(1).reduce(
        (acc, id) => `${acc} and ${roadMap[id].name || 'UNNAMED ROAD'}`,
      (roadMap[roads[0]].name || 'UNNAMED ROAD'));
      return opts.concat({ value: id, label });
    } else if (node.neighbors.length == 1) {
      const label = 'End of Road';
      return opts.concat({ value: id, label });
    }
    return opts;
  }, []);
  return options;
};

export function updateSegmentRoad(segmentIndex, roadId) {
  return async (dispatch, getState) => {
    const state = getState();
    const availableNodes = Object.keys(state.node.cache);
    console.log(roadId)
    const road = state.road.cache[roadId];
    const neededNodes = road.nodes.filter(id => !availableNodes.includes(id));
    if (neededNodes.length) {
      const response = await api.getNodes(neededNodes);
      const result = await response.json();
      dispatch(updateNodes(result.data));
    }
    const nodeCache = getState().node.cache;
    const roadCache = getState().road.cache;
    const crossStreetOptions = generateCrossStreetOptions(road, nodeCache, roadCache);
    dispatch({
      type: types.WORKING_PLAN.SEGMENT.ROAD.UPDATE,
      index: segmentIndex,
      road: roadId,
      crossStreetOptions,
    });
  };
}

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
      const road = state.road.cache[segment.road];
      const partialNodeCache = generateRoadNodeMap(road, state.node.cache);
      partialPath = path(partialNodeCache, [], orig, dest) || [];
    } else {
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
