import api from './api';
import types from './types';

export function updateCity(city) {
  return {
    type: types.CITY.UPDATE,
    city,
  };
}

export function fetchCity(city) {
  return async (dispatch, getState) => {
    const response = await api.getCity(city);
    const result = await response.json();
    return dispatch(updateCity(result.data));
  };
}
