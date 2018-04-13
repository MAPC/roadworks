import constants from './../constants/constants';

function get(url) {
  return fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'same-origin',
    method: 'GET',
  });
}

function post(url, body) {
  return fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'same-origin',
    method: 'POST',
    body,
  });
}

export default {
  getNodes: (nodeIds) => {
    const asString = nodeIds.length
        ? nodeIds.slice(1).reduce((s, id) => s + `&id[]=${id}`, `id[]=${nodeIds[0]}`)
        : '';
    return get(`/api/nodes?${asString}`);
  },
  getCity: (city) => {
    return get(`/api/cities/${city}`);
  },
  getAllRoads: (city) => {
    return get(`/api/roads?city=${city}`);
  },
  getRoads: (roadIds) => {
    const asString = roadIds.length
        ? roadIds.slice(1).reduce((s, id) => s + `&id[]=${id}`, `id[]=${roadIds[0]}`)
        : '';
    return get(`/api/roads?${asString}`);
  },
  getPlans: (city) => {
    return get(`/api/plans?city=${city}`);
  },
  geocodeToLngLat: async (address) => {
    const response = await fetch(`http://pelias.mapc.org/v1/search?text=${address}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'GET',
    });
    const geocoding = await response.json();
    return geocoding.features.length &&
        geocoding.features[0].geometry.type == 'Point'
        ? geocoding.features[0].geometry.coordinates
        : null;
  },
  createPlan: async (plan, published, city) => {
    return post(`/api/plans`, JSON.stringify({
      plan,
      published,
      city,
    }));
  }
};
