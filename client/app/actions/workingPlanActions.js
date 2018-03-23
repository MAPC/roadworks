import api from './api';
import types from './types';
import {
  updateNodes,
} from './nodeActions';


const path = (origId, destId, nodeMap) => {
  const visited = [];
  const parents = {};
  let nodeStack = [origId];
  let prevNode = null;
  let currNode = null;
  while (currNode != prevNode && nodeStack.length) {
    visited.push(currNode);
    prevNode = currNode;
    currNode = nodeStack.pop();
    if (prevNode) {
      parents[currNode] = parents[prevNode] + [prevNode];
    } else {
      parents[currNode] = [];
    }
    const children = nodeMap[currNode].neighbors.filter(id => !visited.includes(id) && nodeMap[id]);
    nodeStack = nodeStack + children;
  }
  return parents[current_node] + [current_node];
};

export function updateSegment(segmentIndex, segment) {
  return async (dispatch, getState) => {
    const state = getState();
    const availableNodes = Object.keys(state.node.cache);
    const roadNodes = state.road.cache[segment.road].nodes;
    const neededNodes = roadNodes.filter(id => !availableNodes.includes(id));
    if (neededNodes.length) {
      const response = await api.getNodes(neededNodes);
      const result = await response.json();
      dispatch(updateNodes(result.data));
    }
    let newSegment = segment;
    if (segment.road) {
      if (segment.origCrossStreet && segment.destCrossStreet) {
        newSegment.nodes = path()
      } else {
        newSegment.nodes = roadNodes;
      }
    }
    dispatch({
      type: types.WORKING_PLAN.SEGMENT.UPDATE,
      index: segmentIndex,
      segment,
    });
  }
}
