import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import Map from '../components/Map';

import constants from './../constants/constants';

import {
  formatCityLayers,
  formatWorkingSegmentLayers,
  formatPlanSegmentLayer,
  getSegmentGeometry,
  flatten,
} from '../util/geojson';

function getWorkingSegmentLayers(timeframes, roadCache, nodeCache) {
  // Calculate all of the properly formatted layers for display on the map
  return timeframes.reduce((layers, timeframe, tfIndex) =>
    layers.concat(timeframe.segments.reduce((layers, segment, stIndex) => {
      // Fetch the base road for the current segment
      const road = roadCache[segment.road_id];
      const layerId = `${tfIndex}-${stIndex}`;
      return layers.concat(
          formatWorkingSegmentLayers(layerId, segment, road, nodeCache));
    }, []))
  , []);
}

function getPlanLayers(plans, roadCache, nodeCache) {
  const layerKits = plans.reduce((plLayers, plan, plIndex) => {
    return plLayers.concat(plan.timeframes.reduce((tfLayers, timeframe, tfIndex) => {
      return tfLayers.concat(timeframe.segments.reduce((stLayers, segment, stIndex) => {
        const layerId = `${plIndex}-${tfIndex}-${stIndex}`;
        const { geometry, nodes } = getSegmentGeometryAndNodes(segment, roadCache, nodeCache);
        return stLayers.concat([{
          layerId,
          color: '#ef4579', // Will come from plan eventually
          geometry,
          nodes,
        }]);
      }, []));
    }, []));
  }, []);

  const nodesToLayer = {};
  const overlapsWith = {};
  const offsetMap = {};

  layerKits.forEach((kit) => {
    kit.nodes.forEach((nodeId) => {
      nodesToLayer[nodeId] = nodesToLayer[nodeId]
          ? nodesToLayer[nodeId].concat([kit.layerId])
          : [kit.layerId];
    });
  });

  // Object.keys(nodesToLayer).filter((arr) => arr.length > 1).forEach((overlap) => {
  //   overlap.forEach((layerId) => {
  //     overlapsWith[layerId] = overlapsWith[layerId]
  //         ?
  //   })
  //   overlapsWith
  // });

  console.log(layerKits);
  return [];
}

const mapStateToProps = (state, props) => {
  const cityName = props.match.params.city.toUpperCase();
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
      const plans = Object.values(state.plan.cache).reduce((plans, plan) => {
        return (plan.city == cityName) ? plans.concat([plan]) : plans;
      }, []);
      return getPlanLayers(plans, roadCache, nodeCache);
    }
    return [];
  })(state, city, resource, action);
  const cityLayers = city ? formatCityLayers(city.geojson, city.mask) : [];
  const fitBounds = activeCoordinates ? activeCoordinates.reduce(
    (bounds, coord) => bounds.extend(coord),
    new mapboxgl.LngLatBounds(activeCoordinates[0], activeCoordinates[0])
  ) : null;
  return {
    layers: segmentLayers.concat(cityLayers),
    fitBounds,
    centroid: city ? city.centroid.coordinates : constants.MAP.DEFAULT_CENTROID,
    bounds: city ? flatten(city.bounds.coordinates, 1) : null,
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
