import PropTypes from 'prop-types';
import React from 'react';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';

const geojsonFormatter = () => {

}

class Map extends React.Component {
  componentDidMount() {
    this.control = new mapboxgl.NavigationControl();

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-71.0589, 42.3601],
      zoom: 12,
    });
    this.map.addControl(this.control, 'top-right');
    this.map.on('load', () => {
      this.props.layers.map((layer) => {
        console.log(layer);
        this.map.addLayer(layer);
      })
    })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      width: '100%',
      height: '500px',
    };
    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}

Map.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    source: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        features: PropTypes.arrayOf(PropTypes.shape({
          type: PropTypes.string,
          properties: PropTypes.shape({
            name: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
            year: PropTypes.number,
          }),
          geometry: {
            type: PropTypes.string,
            coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
          },
        })),
      }),
    }),
    layout: PropTypes.object,
    paint: PropTypes.object,
  })),
};

export default Map;
