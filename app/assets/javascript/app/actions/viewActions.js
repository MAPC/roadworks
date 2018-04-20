import types from './types';

export function toggleActive(id) {
  return {
    type: types.VIEW.TOGGLE_ACTIVE,
    id,
  };
}

export function toggleAllPlans() {
  return {
    type: types.VIEW.TOGGLE_ALL_PLANS,
  };
}
export function togglePlan(id) {
  return {
    type: types.VIEW.TOGGLE_PLAN,
    id,
  };
}
export function toggleAllPermitTypes() {
  return {
    type: types.VIEW.TOGGLE_ALL_PERMIT_TYPES,
  };
}
export function togglePermitType(permitType) {
  return {
    type: types.VIEW.TOGGLE_PERMIT_TYPE,
    permitType,
  };
}
