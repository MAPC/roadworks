import api from './api';
import types from './types';

export function updatePlans(plans) {
  return {
    type: types.PLAN.BATCH_UPDATE,
    plans,
  };
}

export function fetchPlans(city) {
  return async (dispatch, getState) => {
    const response = await api.getPlans(city);
    const result = await response.json();
    dispatch(updatePlans(result));
  };
}
