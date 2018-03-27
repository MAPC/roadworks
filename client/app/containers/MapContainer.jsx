import { connect } from 'react-redux';
import Map from '../components/Map';

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

const createGeometryFromPartialPath = (path, nodeCache) => {
  const coordinates = path.map(id => JSON.parse(nodeCache[id].geojson).coordinates);
  return {
    type: 'LineString',
    coordinates,
  }
};

const mapStateToProps = (state) => {

  const activeSegment = state.workingPlan.activeSegment != null ? state.workingPlan.segments[state.workingPlan.activeSegment] : null;
  let activeCoordinates = null;
  if (activeSegment) {
    const activeSegmentRoad = state.road.cache[activeSegment.road];
    activeCoordinates = activeSegmentRoad.nodes.map(id => JSON.parse(state.node.cache[id].geojson).coordinates);
  }
  const nodeCache = state.node.cache;
  const layers = state.workingPlan.segments.reduce((layers, segment, index) => {
    const segmentRoad = state.road.cache[segment.road];
    if (segment.partialPath.length) {
      const geometry = createGeometryFromPartialPath(segment.partialPath, nodeCache);
      const test = layers.concat([
        formatLineLayer(index.toString(), '#aaa', JSON.parse(segmentRoad.geojson)),
        formatLineLayer(index.toString() + 's_line', '#f00', geometry),
        formatPointLayer(index.toString() + 's_start', '#f00', geometry.coordinates[0]),
        formatPointLayer(index.toString() + 's_end', '#f00', geometry.coordinates[geometry.coordinates.length - 1]),
      ]);
      return test;
    } else if (segmentRoad && segmentRoad.nodes.length) {
      return layers.concat([formatLineLayer(index.toString(), '#f00', JSON.parse(segmentRoad.geojson))]);
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
