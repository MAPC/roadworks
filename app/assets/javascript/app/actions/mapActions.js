import types from './types';

export function showMarkers(plans) {
  return {
    type: types.MAP.SHOW_MARKERS,
  };
}

export function hideMarkers(plans) {
  return {
    type: types.MAP.HIDE_MARKERS,
  };
}
