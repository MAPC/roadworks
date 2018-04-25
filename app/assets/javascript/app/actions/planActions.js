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
    const plans = await api.getPlans(city);
    return dispatch(updatePlans(plans));
  };
}
