import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import Map from '../components/Map';

import constants from './../constants/constants';
import enums from './../constants/enums';

import {
  generateUniqueOffsets,
  getSegmentGeometryAndNodes,
  createGeometryFromNodes,
  flatten,
} from '../util/geojson';

function getWorkingSegmentLayers(timeframes, roadCache, nodeCache) {
  // Calculate all of the properly formatted layers for display on the map
  return timeframes.reduce((layers, timeframe, tfIndex) =>
    layers.concat(timeframe.segments.reduce((layers, segment, stIndex) => {
      // Fetch the base road for the current segment
      const road = roadCache[segment.road_id];
      const layerId = `${tfIndex}-${stIndex}`;
      if (segment.nodes.length) {
        // If the segment is not the whole road, plot the calculated path between
        // the orig and dest nodes
        const mergedNodeCache = Object.assign({}, nodeCache, segment.custom_nodes);
        const geometry = createGeometryFromNodes(segment.nodes, mergedNodeCache);
        const firstPoint = geometry.coordinates[0];
        const lastPoint = geometry.coordinates[geometry.coordinates.length - 1];
        return layers.concat([{
          id: layerId,
          type: 'line',
          options: { offset: 0, before: 'city-outline' },
          version: segment.version,
          color: '#aaa',
          geometry: road.geojson,
        }, {
          id: `${layerId}-s_line`,
          type: 'line',
          options: { offset: 0 },
          version: segment.version,
          color: '#f00',
          geometry: geometry,
        }, {
          id: `${layerId}-s_start`,
          type: 'circle',
          options: { offset: 0 },
          version: segment.version,
          color: '#f00',
          geometry: { type: 'Point', coordinates: firstPoint },
        }, {
          id: `${layerId}-s_end`,
          type: 'circle',
          options: { offset: 0 },
          version: segment.version,
          color: '#f00',
          geometry: { type: 'Point', coordinates: lastPoint },
        }]);
      } else if (road && road.nodes.length) {
        // Plot the whole road, if no partial path has been calculated
        return layers.concat([{
          id: layerId,
          type: 'line',
          options: { offset: 0 },
          version: segment.version,
          color: '#f00',
          geometry: road.geojson,
        }]);
      }
      return layers;
    }, []))
  , []);
}

function getPlanLayers(plans, roadCache, nodeCache) {
  const layerKits = plans.reduce((plLayers, plan) => {
    return plLayers.concat(plan.timeframes.reduce((tfLayers, timeframe) => {
      return tfLayers.concat(timeframe.segments.reduce((stLayers, segment) => {
        const layerId = `${plan.id}-${timeframe.id}-${segment.id}`;
        const { geometry, nodes } = getSegmentGeometryAndNodes(segment, roadCache, nodeCache);
        return stLayers.concat([{
          layerId,
          color: plan.color,
          geometry,
          nodes,
        }]);
      }, []));
    }, []));
  }, []);

  const offsetMap = generateUniqueOffsets(layerKits);
  return layerKits.map((kit) => ({
    id: kit.layerId,
    type: 'line',
    version: 1,
    color: kit.color,
    options: { offset: (offsetMap[kit.layerId] || 0) },
    geometry: kit.geometry,
  }));
}

const mapStateToProps = (state, props) => {
  const cityName = props.match.params.city.toUpperCase().replace('-', ' ');
  const { resource, action } = props.match.params;
  const city = state.city.cache[cityName];

  const activeCoordinates = ((state, city, resource, action) => {
    if (resource == 'plan' && action == 'create') {
      const focusedRoad = state.road.cache[state.workingPlan.focusedRoad];
      if (focusedRoad) {
        return focusedRoad.nodes
            .map(id => state.node.cache[id].geojson.coordinates);
      }
    }
    if (city && city.mask) {
      return flatten(city.geojson.coordinates, 2);
    }
    return null;
  })(state, city, resource, action);

  const segmentLayers = ((state, city, resource, action) => {
    const roadCache = state.road.cache;
    const nodeCache = state.node.cache;
    if (resource == 'plan' && action == 'create') {
      const timeframes = state.workingPlan.timeframes;
      return getWorkingSegmentLayers(timeframes, roadCache, nodeCache);
    } else if (Object.keys(roadCache).length && Object.keys(nodeCache).length) {
      const plans = state.view.hideAllPlans ? [] :
          Object.values(state.plan.cache).reduce((plans, plan) => {
            return (plan.city == cityName && !state.view.hiddenPlans[plan.id])
                ? plans.concat([plan])
                : plans;
          }, []);
      return getPlanLayers(plans, roadCache, nodeCache);
    }
    return [];
  })(state, city, resource, action);

  const markers = ((state, city, resource, action) => {
    if (resource != 'plan' && action != 'create' && !state.view.hideAllPermits) {
      return Object.values(state.permit.cache).reduce((permits, permit) => {
        if (permit.city_name == cityName &&
            !state.view.hiddenPermitTypes[permit.permit_type] &&
            permit.geojson) {
          return permits.concat([{
            id: permit.id.toString(),
            color: enums.PERMIT_TYPE_COLORS[permit.permit_type],
            coordinates: permit.geojson.coordinates,
          }]);
        }
        return permits;
      }, []);
    }
    return [];
  })(state, city, resource, action)

  const cityLayers = city ? [{
    id: 'city-outline',
    type: 'line',
    version: 1,
    color: '#f5a87c',
    geometry: city.geojson,
  }, {
    id: 'city-mask',
    type: 'fill',
    version: 1,
    color: '#000',
    geometry: city.mask,
  }] : [];

  const fitBounds = activeCoordinates ? activeCoordinates.reduce(
    (bounds, coord) => bounds.extend(coord),
    new mapboxgl.LngLatBounds(activeCoordinates[0], activeCoordinates[0])
  ) : null;

  return {
    layers: cityLayers.concat(segmentLayers),
    markers,
    fitBounds,
    centroid: city ? city.centroid.coordinates : constants.MAP.DEFAULT_CENTROID,
    bounds: city ? flatten(city.bounds.coordinates, 1) : [],
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
