import types from './types';

export function toggleActive(id) {
  return {
    type: types.VIEW.TOGGLE_ACTIVE,
    id,
  };
}
