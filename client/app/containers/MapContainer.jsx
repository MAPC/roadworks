import { connect } from 'react-redux';
import Map from '../components/Map';

// Format a line layer for display in Mapbox
const formatLineLayer = (id, color, geometry, isDashed) => {
  const features = [{
    type: 'Feature',
    properties: {
    },
    geometry,
  }];
  const dashedProps = isDashed ? {
    'line-dasharray': [8, 8],
  } : {};
  return {
    id: id,
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features,
      },
    },
    layout: {
        'line-join': 'round',
        'line-cap': 'round',
    },
    paint: Object.assign({}, {
        'line-color': color,
        'line-width': 8,
    }, dashedProps),
  };
};

// Format a point layer for display in Mapbox
const formatPointLayer = (id, color, coordinates) => {
  const features = [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates,
    },
  }];
  return {
    id: id,
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features,
      },
    },
    layout: {
    },
    paint: {
      'circle-color': color,
      'circle-radius': 10,
    },
  };
};

// Use the GeoJSON in the nodes geometries to assemble a LineString
const createGeometryFromNodes = (path, nodeCache) => {
  const coordinates = path
      .map(id => nodeCache[id].geojson.coordinates);
  return {
    type: 'LineString',
    coordinates,
  }
};

const mapStateToProps = (state) => {
  // Find the active segment that will be zoomed to
  const activeSegment = state.workingPlan.activeSegment != null
      ? state.workingPlan.segments[state.workingPlan.activeSegment]
      : null;
  // ActiveCoordinates reflect the points that must be fit within the map's
  // viewing bounds
  let activeCoordinates = null;
  if (activeSegment) {
    const activeSegmentRoad = state.road.cache[activeSegment.road];
    activeCoordinates = activeSegmentRoad.nodes
        .map(id => state.node.cache[id].geojson.coordinates);
  }
  const nodeCache = state.node.cache;
  // Calculate all of the properly formatted layers for display on the map
  const layers = state.workingPlan.segments.reduce((layers, segment, index) => {
    // Fetch the base road for the current segment
    const segmentRoad = state.road.cache[segment.road];
    if (segment.nodes.length) {
      // If the segment is not the whole road, plot the calculated path between
      // the orig and dest nodes
      const geometry = createGeometryFromNodes(
        segment.nodes,
        Object.assign({}, nodeCache, segment.custom_nodes)
      );
      return layers.concat([
        formatLineLayer(
          index.toString(),
          '#aaa',
          JSON.parse(segmentRoad.geojson)
        ),
        formatLineLayer(
          index.toString() + 's_line',
          '#f00',
          geometry
        ),
        formatPointLayer(
          index.toString() + 's_start',
          '#f00',
          geometry.coordinates[0]
        ),
        formatPointLayer(
          index.toString() + 's_end',
          '#f00',
          geometry.coordinates[geometry.coordinates.length - 1]
        ),
      ]);
    } else if (segmentRoad && segmentRoad.nodes.length) {
      // Plot the whole road, if no partial path has been calculated
      return layers.concat([
        formatLineLayer(
          index.toString(),
          '#f00',
          JSON.parse(segmentRoad.geojson)
        ),
      ]);
    }
    return layers;
  }, []);
  return {
    layers,
    activeCoordinates,
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
