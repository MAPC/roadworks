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
    const response = await api.getNodes(city);
    const result = await response.json();
    return dispatch(updateNodes(result));
  };
}
