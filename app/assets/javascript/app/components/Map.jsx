import PropTypes from 'prop-types';
import React from 'react';

import constants from './../constants/constants';

let mapboxgl;
if (__CLIENT__) {
  // Mapbox GL requires the global window variable which does not exist in
  // Server-side rendering. Only import on the client.
  mapboxgl = require('mapbox-gl');
  mapboxgl.accessToken = constants.MAPBOX_PUBLIC_API_KEY;
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.fitBounds = this.fitBounds.bind(this);
    this.drawLayers = this.drawLayers.bind(this);
    this.removeLayers = this.removeLayers.bind(this);
  }

  componentDidMount() {
    this.control = new mapboxgl.NavigationControl();

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-71.0589, 42.3601],
      zoom: 12,
    });
    this.map.addControl(this.control, 'top-right');
    this.map.on('load', () => {
      this.props.layers.map((layer) => {
        this.map.addLayer(layer);
      });
      if (this.props.activeCoordinates) {
        this.fitBounds(this.props.activeCoordinates);
      }
    })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  fitBounds(coordinates) {
    const newBounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    );
    this.map.fitBounds(newBounds, {
      padding: 48,
    });
  }

  removeLayers(layerIds) {
    layerIds.forEach((id) => {
      this.map.removeLayer(id);
      this.map.removeSource(id);
    });
  }

  drawLayers(layers) {
    layers.map((layer) => {
      this.map.addLayer(layer);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeCoordinates &&
        this.props.activeCoordinates != prevProps.activeCoordinates) {
      this.fitBounds(this.props.activeCoordinates);
    }
    if (this.props.layers &&
        this.props.layers != prevProps.layers) {
      this.removeLayers(prevProps.layers.map(layer => layer.id));
      this.drawLayers(this.props.layers);
    }
  }

  render() {
    return (
      <section className="component Map">
        <div className="map-layer" ref={el => this.mapContainer = el} />
      </section>
    );
  }
}

Map.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
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
          geometry: PropTypes.shape({
            type: PropTypes.string,
            coordinates: PropTypes.array,
          }),
        })),
      }),
    }),
    layout: PropTypes.object,
    paint: PropTypes.object,
  })),
  activeCoordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

export default Map;
