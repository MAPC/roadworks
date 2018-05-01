import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import Map from '../components/Map';

import constants from './../constants/constants';
import enums from './../constants/enums';

import {
  getMarkerGeometryAndAlternates,
  generateUniqueOffsets,
  getSegmentGeometryAndNodes,
  createGeometryFromNodes,
  flatten,
} from '../util/geojson';

import {
  encodeId,
} from '../util/id';

import capitalize from '../util/capitalize';

function getWorkingSegmentLayersAndMarkers(timeframes, roadCache, nodeCache) {
  // Calculate all of the properly formatted layers for display on the map
  return timeframes
      .filter((tf) => !tf._destroy)
      .reduce((pkg, timeframe, tfIndex) => {
    const newPkg = timeframe.segments
        .filter((tf) => !tf._destroy)
        .reduce((pkg, segment, stIndex) => {
      // Fetch the base road for the current segment
      const road = roadCache[segment.road_id];
      const layerId = encodeId(0, timeframe.workingId, tfIndex, segment.workingId, stIndex);
      const startDate = timeframe.start
          ? (new Date(timeframe.start)).toLocaleString(
              'en-US',
              constants.MAP.LABELS.LOCALESTRING_OPTIONS
            )
          : '[start date]';
      const endDate = timeframe.end
          ? (new Date(timeframe.end)).toLocaleString(
              'en-US',
              constants.MAP.LABELS.LOCALESTRING_OPTIONS
            )
          : '[end date]';
      const bottom = `${startDate} - ${endDate}`;
      const top = road ? capitalize(road.name) : 'Road Name';
      if (segment.nodes.length) {
        // If the segment is not the whole road, plot the calculated path between
        // the orig and dest nodes
        const mergedNodeCache = Object.assign({}, nodeCache, segment.custom_nodes);
        const geometry = createGeometryFromNodes(segment.nodes, mergedNodeCache);
        const firstPoint = geometry.coordinates[0];
        const lastPoint = geometry.coordinates[geometry.coordinates.length - 1];
        const { markerGeometry, alternateMarkerGeometries } =
            getMarkerGeometryAndAlternates(segment.nodes.map((id) => mergedNodeCache[id]));
        return {
          segmentLayers: pkg.segmentLayers.concat([{
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
          }]),
          segmentMarkers: pkg.segmentMarkers.concat([{
            id: layerId,
            type: 'plan',
            color: '#f00',
            version: segment.version,
            geometry: markerGeometry,
            alternateGeometries: alternateMarkerGeometries,
            label: {
              top,
              bottom,
              start: timeframe.start,
            },
          }]),
        };
      } else if (road && road.nodes.length) {
        // Plot the whole road, if no partial path has been calculated
        const { markerGeometry, alternateMarkerGeometries } =
            getMarkerGeometryAndAlternates(road.nodes.map((id) => nodeCache[id]));
        return {
          segmentLayers: pkg.segmentLayers.concat([{
            id: layerId,
            type: 'line',
            options: { offset: 0 },
            version: segment.version,
            color: '#f00',
            geometry: road.geojson,
          }]),
          segmentMarkers: pkg.segmentMarkers.concat([{
            id: layerId,
            type: 'plan',
            color: '#f00',
            version: segment.version,
            geometry: markerGeometry,
            alternateGeometries: alternateMarkerGeometries,
            label: {
              top,
              bottom,
              start: timeframe.start,
            },
          }]),
        };
      }
      return pkg;
    }, { segmentLayers: [], segmentMarkers: [] });
    return {
      segmentLayers: pkg.segmentLayers.concat(newPkg.segmentLayers),
      segmentMarkers: pkg.segmentMarkers.concat(newPkg.segmentMarkers),
    };
  }, { segmentLayers: [], segmentMarkers: [] });
}

function getPlanLayersAndMarkers(plans, roadCache, nodeCache) {
  const layerKits = plans.reduce((plLayers, plan) => {
    return plLayers.concat(plan.timeframes
        .reduce((tfLayers, timeframe, timeframeIndex) => {
      return tfLayers.concat(timeframe.segments
          .reduce((stLayers, segment, segmentIndex) => {
        const layerId = encodeId(plan.id, timeframe.id, timeframeIndex, segment.id, segmentIndex);
        const { geometry, nodes } = getSegmentGeometryAndNodes(segment, roadCache, nodeCache);

        return stLayers.concat([{
          layerId,
          color: plan.color,
          geometry,
          nodes,
          roadName: roadCache[segment.road_id]
              ? roadCache[segment.road_id].name
              : '',
          start: timeframe.start,
          end: timeframe.end,
        }]);
      }, []));
    }, []));
  }, []);

  const offsetMap = generateUniqueOffsets(layerKits);
  return {
    segmentLayers: layerKits.map((kit) => ({
      id: kit.layerId,
      type: 'line',
      version: 1,
      color: kit.color,
      options: { offset: (offsetMap[kit.layerId] || 0) },
      geometry: kit.geometry,
    })),
    segmentMarkers: layerKits.map((kit) => {
      const startDate = (new Date(kit.start))
          .toLocaleString('en-US', constants.MAP.LABELS.LOCALESTRING_OPTIONS);
      const endDate = (new Date(kit.end))
          .toLocaleString('en-US', constants.MAP.LABELS.LOCALESTRING_OPTIONS);
      const { markerGeometry, alternateMarkerGeometries } =
          getMarkerGeometryAndAlternates(kit.nodes.map((id) => nodeCache[id]));
      return {
        id: kit.layerId,
        type: 'plan',
        color: kit.color,
        version: 1,
        geometry: markerGeometry,
        alternates: alternateMarkerGeometries,
        label: {
          top: capitalize(kit.roadName),
          bottom: `${startDate} - ${endDate}`,
          start: kit.start,
        },
      };
    }),
  };
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

  const { segmentLayers, segmentMarkers } = ((state, city, resource, action) => {
    const roadCache = state.road.cache;
    const nodeCache = state.node.cache;
    if (resource == 'plan' && action == 'create') {
      return getWorkingSegmentLayersAndMarkers(
        state.workingPlan.timeframes,
        roadCache,
        nodeCache
      );
    } else if (Object.keys(roadCache).length && Object.keys(nodeCache).length) {
      const plans = state.view.hideAllPlans ? [] :
          Object.values(state.plan.cache).reduce((plans, plan) => {
            return (plan.city == cityName && !state.view.hiddenPlans[plan.id])
                ? plans.concat([plan])
                : plans;
          }, []);
      return getPlanLayersAndMarkers(plans, roadCache, nodeCache);
    }
    return { segmentLayers: [], segmentMarkers: [] };
  })(state, city, resource, action);

  const permitMarkers = ((state, city, resource, action) => {
    if (resource != 'plan' && action != 'create' && !state.view.hideAllPermitTypes) {
      return Object.values(state.permit.cache).reduce((permits, permit) => {
        if (permit.city_name == cityName &&
            !state.view.hiddenPermitTypes[permit.permit_type] &&
            permit.geojson) {
          const start = permit.start_date
              ? (new Date(permit.start_date))
                  .toLocaleString('en-US', constants.MAP.LABELS.LOCALESTRING_OPTIONS)
              : '[start date]';
          const end = permit.end_date
              ? (new Date(permit.end_date))
                  .toLocaleString('en-US', constants.MAP.LABELS.LOCALESTRING_OPTIONS)
              : '[end date]';
          return permits.concat([{
            id: permit.id.toString(),
            type: 'permit',
            color: enums.PERMIT_TYPE_COLORS[permit.permit_type],
            geometry: permit.geojson,
            label: {
              top: permit.applicant_name || '{applicant}',
              bottom: `${start} - ${end}`,
            },
          }]);
        }
        return permits;
      }, []);
    }
    return [];
  })(state, city, resource, action);

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
    markers: permitMarkers.concat(segmentMarkers),
    fitBounds,
    centroid: city ? city.centroid.coordinates : constants.MAP.DEFAULT_CENTROID,
    bounds: city ? flatten(city.bounds.coordinates, 1) : [],
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
