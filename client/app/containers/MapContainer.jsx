import { connect } from 'react-redux';
import Map from '../components/Map';

const formatLayer = (id, color, coordinates) => {
  const features = [{
    type: 'Feature',
    properties: {
    },
    geometry: {
      type: 'LineString',
      coordinates: coordinates,
    },
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

const mapStateToProps = (state) => {

  const activeSegment = state.workingPlan.activeSegment != null ? state.workingPlan.segments[state.workingPlan.activeSegment] : null;
  let activeCoordinates = null;
  if (activeSegment) {
    const activeSegmentRoad = state.road.cache[activeSegment.road];
    activeCoordinates = activeSegmentRoad.nodes.map(id => JSON.parse(state.node.cache[id].geojson).coordinates);
  }
  const layers = state.workingPlan.segments.reduce((layers, segment, index) => {
    const segmentRoad = state.road.cache[segment.road]
    if (segmentRoad && segmentRoad.nodes.length) {
      const coordinates = segmentRoad.nodes.map(id => JSON.parse(state.node.cache[id].geojson).coordinates);
      return layers.concat([formatLayer(index, '#f00', coordinates)]);
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
