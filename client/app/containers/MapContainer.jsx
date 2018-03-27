import { connect } from 'react-redux';
import Map from '../components/Map';

const formatLayer = (id, color, geometry) => {
  const features = [{
    type: 'Feature',
    properties: {
    },
    geometry,
  }];
  return {
    id: new Date().toISOString(),
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
    paint: {
        'line-color': color,
        'line-width': 8,
    },
  };
};

const createFeatureFromPartialPath = (path, nodeCache) => {
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
      const feature = createFeatureFromPartialPath(segment.partialPath, nodeCache);
      return layers.concat([formatLayer(index, '#f00', JSON.parse(segmentRoad.geojson))]);
    } else if (segmentRoad && segmentRoad.nodes.length) {
      return layers.concat([formatLayer(index, '#f00', JSON.parse(segmentRoad.geojson))]);
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
