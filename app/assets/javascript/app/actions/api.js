import constants from './../constants/constants';

const getCSRF = () => ({
  param: document.querySelector('meta[name="csrf-param"]').content,
  token: document.querySelector('meta[name="csrf-token"]').content,
});

async function getJSON(url) {
  const response = await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'same-origin',
    method: 'GET',
  });
  return await response.json();
}

async function postJSON(url, body) {
  const response = fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'same-origin',
    method: 'POST',
    body,
  });
  return await response.json();
}

async function putJSON(url, body) {
  const response = await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'same-origin',
    method: 'PUT',
    body,
  });
  return await response.json();
}

export default {
  getNodes: (nodeIds) => {
    const asString = nodeIds.length
        ? nodeIds.slice(1).reduce((s, id) => s + `&id[]=${id}`, `id[]=${nodeIds[0]}`)
        : '';
    return getJSON(`/api/nodes?${asString}`);
  },
  getAllNodes: (city) => {
    return getJSON(`/api/nodes?city=${city}`);
  },
  getNodesByRoads: (roadIds) => {
    const asString = roadIds.length
        ? roadIds.slice(1).reduce((s, id) => s + `&road[]=${id}`, `road[]=${roadIds[0]}`)
        : '';
    return getJSON(`/api/nodes?${asString}`);
  },
  getCity: (city) => {
    return getJSON(`/api/cities/${city}`);
  },
  getAllRoads: (city) => {
    return getJSON(`/api/roads?city=${city}`);
  },
  getRoadsById: (roadIds) => {
    const asString = roadIds.length
        ? roadIds.slice(1).reduce((s, id) => s + `&id[]=${id}`, `id[]=${roadIds[0]}`)
        : '';
    return getJSON(`/api/roads?${asString}`);
  },
  getPlans: (city) => {
    return getJSON(`/api/plans?city=${city}`);
  },
  getPermits: (city) => {
    return getJSON(`/api/permits?city=${city}`);
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
    return postJSON(`/api/plans`, JSON.stringify({
      plan,
      published,
      city,
    }));
  },
  updatePlan: async (plan, published, city) => {
    return putJSON(`/api/plans/${plan.id}`, JSON.stringify({
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
