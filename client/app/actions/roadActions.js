import api from './api';
import types from './types';

export function updateRoads(roads) {
  return {
    type: types.ROAD.BATCH_UPDATE,
    roads,
  };
}

export function fetchRoads(city) {
  return async (dispatch, getState) => {
    const response = await api.getRoads(city);
    const result = await response.json();

    dispatch(updateRoads(result.data));
  };
}
