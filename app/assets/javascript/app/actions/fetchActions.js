import api from './api';
import types from './types';

import {
  updateUsers,
} from './userActions';

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
    const [city, plans, permits] = await Promise.all([
      api.getCity(cityName),
      api.getPlans(cityName),
      api.getPermits(cityName),
    ]);
    const roadIds = Array.from(new Set(plans.reduce((pRoadIds, plan) =>
      pRoadIds.concat(plan.timeframes.reduce((tRoadIds, timeframe) =>
        tRoadIds.concat(timeframe.segments.reduce((sRoadIds, segment) =>
          sRoadIds.concat([segment.road_id]), [])), [])), [])));
    if (!roadIds.length) {
      return dispatch(
          fetchLoadAll({ city, plans, roads: [], nodes: [], permits }));
    }
    const [roads, nodes] = await Promise.all([
      api.getRoadsById(roadIds),
      api.getNodesByRoads(roadIds),
    ]);
    const adjRoadIds = Array.from(nodes
        .reduce((ids, node) => new Set([...ids, ...node.part_of]), new Set([])))
        .filter((id) => !roadIds.includes(id));
    if (!adjRoadIds.length) {
      return dispatch(
          fetchLoadAll({ city, plans, roads, nodes, permits }));
    }
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

export function fetchContributors() {
  return async (dispatch, getState) => {
    const users = await api.getContributors();
    if (users && users.length) {
      return dispatch(updateUsers(users));
    }
  };
}
