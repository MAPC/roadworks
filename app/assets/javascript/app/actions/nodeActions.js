import types from './types';
import api from './api';

export function updateNodes(nodes) {
  return {
    type: types.NODE.BATCH_UPDATE,
    nodes,
  };
}

export function fetchNodes(city) {
  return async (dispatch, getState) => {
    const nodes = await api.getNodes(city);
    return dispatch(updateNodes(nodes));
  };
}
