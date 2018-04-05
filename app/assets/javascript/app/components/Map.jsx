import PropTypes from 'prop-types';
import React from 'react';
import mapboxgl from 'mapbox-gl';

import constants from './../constants/constants';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = constants.MAPBOX_PUBLIC_API_KEY;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.fitBounds = this.fitBounds.bind(this);
    this.setMaxBounds = this.setMaxBounds.bind(this);
    this.drawLayers = this.drawLayers.bind(this);
    this.removeLayers = this.removeLayers.bind(this);
  }

  componentDidMount() {
    this.control = new mapboxgl.NavigationControl();

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: this.props.centroid,
      maxBounds: constants.MAP.MAX_BOUNDS,
      zoom: 12,
    });
    this.map.addControl(this.control, 'top-right');
    this.map.on('load', () => {
      this.setState({ loaded: true });
      this.map.resize();
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
      padding: {
        top: 64,
        left: 600,
        right: 64,
        bottom: 64,
      }
    });
  }

  setMaxBounds(coordinates) {
    const newBounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    );
    this.map.setMaxBounds(newBounds);
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
    if (this.props.bounds &&
        this.props.bounds != prevProps.bounds) {
      this.setMaxBounds(this.props.bounds);
    }
    if (this.props.layers &&
        this.props.layers != prevProps.layers &&
        this.state.loaded) {
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
