import constants from './../constants/constants';

const getCSRF = () => ({
  param: document.querySelector('meta[name="csrf-param"]').content,
  token: document.querySelector('meta[name="csrf-token"]').content,
});

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
  getRoadsById: (roadIds) => {
    const asString = roadIds.length
        ? roadIds.slice(1).reduce((s, id) => s + `&id[]=${id}`, `id[]=${roadIds[0]}`)
        : '';
    return get(`/api/roads?${asString}`);
  },
  getPlans: (city) => {
    return get(`/api/plans?city=${city}`);
  },
  getPermits: (city) => {
    return get(`/api/permits?city=${city}`);
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
  },
  login: async (email, password) => {
    const csrf = getCSRF();

    return fetch('/api/users/sign_in', {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        user: { email, password },
        [csrf.param]: csrf.token,
      }),
    }).then(res => res.statusText === "Created" ? res.json() : null);
  },
  logout: async () => {
    return fetch('/api/users/sign_out', {
      credentials: 'same-origin',
      method: 'DELETE'
    });
  },
};
