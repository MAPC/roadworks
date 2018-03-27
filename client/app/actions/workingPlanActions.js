import api from './api';
import types from './types';
import {
  updateNodes,
} from './nodeActions';

const path = (origId, destId, nodeMap) => {
  console.log(origId, destId, nodeMap)
  const visited = [];
  const parents = {};
  let nodeStack = [origId];
  let prevNode = null;
  let currNode = null;
  while (currNode != destId && nodeStack.length) {
    currNode = nodeStack.pop();
    if (prevNode) {
      parents[currNode] = parents[prevNode].concat([prevNode]);
    } else {
      parents[currNode] = [];
    }
    const children = nodeMap[currNode].neighbors.filter(id => !visited.includes(id) && nodeMap[id]);
    nodeStack = nodeStack.concat(children);
    visited.push(currNode);
    prevNode = currNode;

  }
  console.log(parents);
  return parents[currNode] ? parents[currNode].concat([currNode]) : [];
};

const generateRoadNodeMap = (road, nodeCache) => {
  const nodeMap = {};
  road.nodes.forEach((nodeId) => {
    nodeMap[nodeId] = nodeCache[nodeId];
  });
  return nodeMap;
};

const generateCrossStreetNodeMap = (road, nodeCache) => {
  const nodeMap = {};
  road.nodes.forEach((nodeId) => {
    nodeMap[nodeId] = nodeCache[nodeId].part_of.filter(id => id != road.id);
  });
  return nodeMap;
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
    const crossStreetNodeMap = generateCrossStreetNodeMap(road, nodeCache);
    dispatch({
      type: types.WORKING_PLAN.SEGMENT.ROAD.UPDATE,
      index: segmentIndex,
      road: roadId,
      crossStreetNodeMap,
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
      partialPath = path(orig, dest, partialNodeCache);
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

// export function updateSegmentDest(segmentIndex, dest) {

// }

// export function updateSegment(segmentIndex, segment) {
//   return async (dispatch, getState) => {
//     const state = getState();
//     const availableNodes = Object.keys(state.node.cache);
//     const road = state.road.cache[segment.road];
//     const neededNodes = road.nodes.filter(id => !availableNodes.includes(id));
//     if (neededNodes.length) {
//       const response = await api.getNodes(neededNodes);
//       const result = await response.json();
//       dispatch(updateNodes(result.data));
//     }
//     const nodeCache = getState().node.cache;
//     const crossStreetNodeMap = generateCrossStreetNodeMap(road, nodeCache);





//     let newSegment = segment;
//     if (segment.road) {
//       if ((!segment.origCrossStreet && segment.destCrossStreet) ||
//           (segment.origCrossStreet && !segment.destCrossStreet)) {
//         newSegment.nodes = path();
//       } else if (segment.origCrossStreet && segment.destCrossStreet) {
//         newSegment.nodes = path();
//       }
//     }
//     dispatch({
//       type: types.WORKING_PLAN.SEGMENT.UPDATE,
//       index: segmentIndex,
//       segment,
//     });
//   }
// }
