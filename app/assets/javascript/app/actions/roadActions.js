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
    const roads = await api.getRoads(city);
    dispatch(updateRoads(roads));
  };
}
