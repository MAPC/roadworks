import api from './api';
import types from './types';
import utils from './utils';
import {
  updateNodes,
} from './nodeActions';

// Recursively generate a path between two nodes
const path = (nodeMap, visited, origIds, destIds) => {
  const origId = origIds[0];
  const destId = destIds[0];
  const base = [origId];
  const newVisited = visited.concat(base)
  if (origId == destId) {
    return base;
  } else {
    const children = nodeMap[origId].neighbors.filter(id => !newVisited.includes(id) && nodeMap[id]);
    let finalPath;
    children.some((child) => {
      const childPath = path(nodeMap, newVisited, [child], [destId]);
      if (childPath) {
        finalPath = base.concat(childPath);
        return true;
      }
      return false;
    });
    if (origIds.length > 1 &&
        origIds.every((id) => finalPath.slice(0, finalPath.length).includes(id))) {
      finalPath = finalPath.slice(origIds.length - 1);
    }
    if (destIds.length > 1 &&
        destIds.every((id) => finalPath.slice(0, finalPath.length).includes(id))) {
      finalPath = finalPath.slice(0, finalPath.length - (destIds.length - 1));
    }
    return finalPath;
  }
};

// Generate a partial node map using the nodes from a particular road
const partialNodeCacheForRoad = (road, nodeCache) => {
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
      type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.ROAD.UPDATE,
      index: segmentIndex,
      road: roadId,
      crossStreetOptions,
    });
  };
}

export function updateSegmentEndPointType(segmentIndex, type, isOrigin) {

  console.log(arguments);

  return (dispatch, getState) => {
    const segment = getState().workingPlan.segments[segmentIndex];
    let orig, dest, is_orig_type_address, is_dest_type_address, nodes, custom_nodes;
    if (isOrigin) {
      is_orig_type_address = type;
      orig = null;
      is_dest_type_address = segment.is_dest_type_address;
      dest = segment.dest;
      nodes = [dest];
      custom_nodes = Object.assign({}, segment.custom_nodes, { [-1]: null });
    } else {
      is_orig_type_address = segment.is_orig_type_address;
      orig = segment.orig;
      is_dest_type_address = type;
      dest = null;
      nodes = [orig];
      custom_nodes = Object.assign({}, segment.custom_nodes, { [-2]: null });
    }
    return dispatch({
      type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.END_POINT_TYPE.UPDATE,
      index: segmentIndex,
      is_orig_type_address,
      orig,
      is_dest_type_address,
      dest,
      nodes: [],
      custom_nodes,
    });
  };
}

function createCustomNode(partialNodeCache, location, address) {
  const distance = (node) => utils.distanceBetweenLocations(
    location,
    node.geojson.coordinates
  );

  const nodeId1 = parseInt(Object.keys(partialNodeCache).reduce((acc, id) => {
    if (!acc) { return id; }
    return distance(partialNodeCache[id]) < distance(partialNodeCache[acc])
        ? id
        : acc;
  }, null));

  const lineVertex1 = partialNodeCache[nodeId1].geojson.coordinates;
  let snappedLocation;
  let nodeId2;
  partialNodeCache[nodeId1].neighbors.forEach((id) => {
    // If neighbor is on this road
    if (partialNodeCache[id]) {
      const lineVertex2 = partialNodeCache[id].geojson.coordinates;
      const newPoint = utils.closestPointOnSegment(lineVertex1,lineVertex2, location);
      if (!nodeId2 || utils.distanceBetweenLocations(location, newPoint) < utils.distanceBetweenLocations(location, snappedLocation)) {
        snappedLocation = newPoint;
        nodeId2 = id;
      }
    }
  });

  return {
    geojson: { type: 'Point', coordinates: snappedLocation },
    neighbors: [nodeId1, nodeId2],
    address,
  };
}

// Update an end point for a segment and generate the partial path
export function updateSegmentEndPoint(segmentIndex, value, isOrigin) {
  return async (dispatch, getState) => {
    const state = getState();
    const segment = state.workingPlan.segments[segmentIndex];
    const partialNodeCache = partialNodeCacheForRoad(
      state.road.cache[segment.road],
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
    })(partialNodeCache, segment, state.road.cache[segment.road], value, isOrigin);

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
      type: types.WORKING_PLAN.TIMEFRAME.SEGMENT.END_POINT.UPDATE,
      index: segmentIndex,
      is_orig_type_address: segment.is_orig_type_address,
      is_dest_type_address: segment.is_dest_type_address,
      nodes: newNodes,
      orig: newEndpoints.orig,
      dest: newEndpoints.dest,
      custom_nodes: newEndpoints.custom_nodes,
    });
  };
}

export function planRemoveTimeframe(index) {
  return {
    type: types.WORKING_PLAN.TIMEFRAME.REMOVE,
    index,
  };
}

export function planAddTimeframe(index) {
  return {
    type: types.WORKING_PLAN.TIMEFRAME.ADD,
  };
}

export function planNameChange(name) {
  return {
    type: types.WORKING_PLAN.NAME.CHANGE,
    name,
  };
}

export function planTypeChange(type) {
  return {
    type: types.WORKING_PLAN.TYPE.CHANGE,
    type,
  };
}
