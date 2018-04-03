import types from './types';

export function updateNodes(nodes) {
  return {
    type: types.NODE.BATCH_UPDATE,
    nodes,
  };
}
