import api from './api';
import types from './types';

export function fetchSetPending() {
  return {
    type: types.FETCH.SET_PENDING,
  };
}

export function fetchLoadAll(city, plans, roads, nodes) {
  return {
    type: types.FETCH.LOAD_ALL,
    city,
    plans,
    roads,
    nodes,
  };
}

export function fetchPlanViewData(cityName) {
  return async (dispatch, getState) => {
    dispatch(fetchSetPending());
    const cityResponse = await api.getCity(cityName);
    const city = await cityResponse.json();
    const plansResponse = await api.getPlans(cityName);
    const plans = await plansResponse.json();
    const roadIds = plans.reduce((pRoadIds, plan) =>
      pRoadIds.concat(plan.timeframes.reduce((tRoadIds, timeframe) =>
        tRoadIds.concat(timeframe.segments.reduce((sRoadIds, segment) =>
          sRoadIds.concat([segment.road_id]), [])), [])), []);
    const roadsResponse = await api.getRoads(roadIds);
    const roads = await roadsResponse.json();
    const nodeIds = roads.reduce((nodeIds, road) =>
      nodeIds.concat(road.nodes), []);
    const nodesResponse = await api.getNodes(nodeIds);
    const nodes = await nodesResponse.json();
    dispatch(fetchLoadAll(city, plans, roads, nodes));
  };
}

export function fetchPlanCreateData(cityName) {
  return async (dispatch, getState) => {
    const cityResponse = await api.getCity(cityName);
    const city = await cityRepsonse.json();
    const roadsResponse = await api.getAllRoads(cityName);
    const roads = await roadsResponse.json();
    return dispatch(fetchLoadAll(city, [], roads, []));
  };
}