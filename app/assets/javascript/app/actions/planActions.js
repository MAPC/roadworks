import types from './types';

export function updatePlan(plan) {
  return {
    type: types.PLAN.UPDATE,
    plan,
  };
}
