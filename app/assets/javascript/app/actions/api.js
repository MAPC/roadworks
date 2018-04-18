import constants from './../constants/constants';

const getCSRF = () => ({
  param: document.querySelector('meta[name="csrf-param"]').content,
  token: document.querySelector('meta[name="csrf-token"]').content,
});

export default {
  getNodes: (nodeIds) => {
    const asString = nodeIds.length
        ? nodeIds.slice(1).reduce((s, id) => s + `&id[]=${id}`, `id[]=${nodeIds[0]}`)
        : '';
    return fetch(`/api/nodes?${asString}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
      method: 'GET',
    });
  },
  getCity: (city) => {
    return fetch(`/api/cities/${city}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
      method: 'GET',
    });
  },
  getRoads: (city) => {
    return fetch(`/api/roads?city=${city}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
      method: 'GET',
    });
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
    return fetch(`/api/plans`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        plan,
        published,
        city,
      }),
    });
  },
  login: async (email, password) => {
    const csrf = getCSRF();

    return fetch('/api/users/sign_in', {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        user: { email, password },
        [csrf.param]: csrf.token,
      }),
    });
  },
};
