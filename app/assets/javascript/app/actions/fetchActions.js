import api from './api';
import types from './types';

export function fetchSetPending() {
  return {
    type: types.FETCH.SET_PENDING,
  };
}

export function fetchLoadAll({ city, plans, roads, nodes, permits }) {
  return {
    type: types.FETCH.LOAD_ALL,
    city,
    plans,
    roads,
    nodes,
    permits,
  };
}

export function fetchPlanViewData(cityName) {
  return async (dispatch, getState) => {
    dispatch(fetchSetPending());
    const [city, plans] = await Promise.all([
      api.getCity(cityName),
      api.getPlans(cityName),
    ]);
    const roadIds = Array.from(new Set(plans.reduce((pRoadIds, plan) =>
      pRoadIds.concat(plan.timeframes.reduce((tRoadIds, timeframe) =>
        tRoadIds.concat(timeframe.segments.reduce((sRoadIds, segment) =>
          sRoadIds.concat([segment.road_id]), [])), [])), [])));
    const [permits, roads, nodes] = await Promise.all([
      api.getPermits(cityName),
      api.getRoadsById(roadIds),
      api.getNodesByRoads(roadIds),
    ]);
    const adjRoadIds = Array.from(nodes
        .reduce((ids, node) => new Set([...ids, ...node.part_of]), new Set([])))
        .filter((id) => !roadIds.includes(id));
    const adjRoads = await api.getRoadsById(adjRoadIds);
    return dispatch(fetchLoadAll({
      city,
      plans,
      roads: roads.concat(adjRoads),
      nodes,
      permits,
    }));
  };
}

export function fetchPlanCreateData(cityName) {
  return async (dispatch, getState) => {
    const [city, roads] = await Promise.all([
      api.getCity(cityName),
      api.getAllRoads(cityName),
    ]);
    return dispatch(fetchLoadAll({
      city,
      plans: [],
      roads,
      nodes: [],
      permits: [],
    }));
  };
}
