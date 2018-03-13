import { connect } from 'react-redux';
import Map from '../components/Map';

const formatLayer = (id, color, segments) => {
  const features = segments.map(segment => ({
    type: 'Feature',
    properties: {
      name: segment.name,
      start: segment.start,
      end: segment.end,
      year: segment.year,
    },
    geometry: {
      type: 'LineString',
      coordinates: segment.coordinates,
    },
  }));
  return {
    id,
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
  const plan = {
    id: 'pavingplan',
    color: '#f00',
    segments: [{
      name: 'Washington Street',
      start: 'Temple Place',
      end: 'Other Street',
      year: 2018,
      coordinates: [
        [-71.061255, 42.354777],
        [-71.062866, 42.355618]
      ],
    }],
  };
  return {
    layers: [formatLayer(plan.id, plan.color, plan.segments )],
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
