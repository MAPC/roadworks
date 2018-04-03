import constants from './../constants/constants';

export default {
  getNodes: (nodeIds) => {
    const asString = nodeIds.length
        ? nodeIds.slice(1).reduce((s, id) => s + `&id[]=${id}`, `id[]=${nodeIds[0]}`)
        : '';
    return fetch(`/api/node?${asString}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
      method: 'GET',
    });
  },
  getRoads: (town) => {
    return fetch(`/api/road?city=${town}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
      method: 'GET',
    });
  },
  geocodeToLngLat: async (address) => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${constants.MAPBOX_PUBLIC_API_KEY}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'GET',
    });
    const geocoding = await response.json();
    console.log(geocoding)
    return geocoding.features.length &&
        geocoding.features[0].geometry.type == 'Point'
        ? geocoding.features[0].geometry.coordinates
        : null;
  },
};
