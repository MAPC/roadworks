import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import constants from './../constants/constants';
import MapLabel from './MapLabel';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = constants.MAPBOX_PUBLIC_API_KEY;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      markerMap: {},
    };
    this.fitBounds = this.fitBounds.bind(this);
    this.setMaxBounds = this.setMaxBounds.bind(this);
    this.redrawLayers = this.redrawLayers.bind(this);
  }

  componentDidMount() {
    this.control = new mapboxgl.NavigationControl();
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: this.props.centroid,
      maxBounds: constants.MAP.MAX_BOUNDS,
      zoom: 12,
      minZoom: 8,
      maxZoom: 16,
    });

    this.map.addControl(this.control, 'top-right');
    this.map.on('load', () => {
      this.map.resize();
      this.redrawLayers(this.props.layers, []);
      this.redrawMarkers(this.props.markers, []);
      if (this.props.fitBounds) {
        this.fitBounds(this.props.fitBounds);
      }
      this.setState({ loaded: true });
    })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  fitBounds(mapboxBounds) {
    this.map.fitBounds(mapboxBounds, {
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

  redrawLayers(layers, prevLayers) {
    const prevLayerMap = prevLayers.reduce((map, l) =>
        Object.assign(map, { [l.id]: l }), {});
    const layerMap = layers.reduce((map, l) =>
        Object.assign(map, { [l.id]: l }), {});

    const layersToBeAdded = Object.keys(layerMap).filter((id) =>
        (!prevLayerMap[id] || layerMap[id].version != prevLayerMap[id].version));
    const layersToBeRemoved = Object.keys(prevLayerMap).filter((id) =>
        (!layerMap[id] || layerMap[id].version != prevLayerMap[id].version));

    layersToBeRemoved.forEach((id) => {
      this.map.removeLayer(id);
      this.map.removeSource(id);
    });

    layersToBeAdded.forEach((id) => {
      this.map.addLayer(layerMap[id]);
    });
  }

  redrawMarkers(markers, prevMarkers) {
    console.log(markers, prevMarkers)
    const prevMarkerIds = prevMarkers.map((m) => m.id);
    const markerIds = markers.map((m) => m.id);
    const markersToBeAdded = markers.filter((m) =>
        (!prevMarkerIds.includes(m.id) ||
        !Object.keys(this.state.markerMap).includes(m.id.toString())));
    const markersToBeRemoved = prevMarkers.filter((m) =>
        !markerIds.includes(m.id));
    console.log(markersToBeAdded, markersToBeRemoved)
    const markerMapRemove = markersToBeRemoved.reduce((map, markerDetails) => {
      const marker = this.state.markerMap[markerDetails.id];
      const element = marker.getElement();
      ReactDOM.unmountComponentAtNode(element);
      element.remove();
      marker.remove();
      return Object.assign(map, { [markerDetails.id]: null });
    }, {});

    const markerMapAdd = markersToBeAdded.reduce((map, markerDetails) => {
      const div = document.createElement('div');
      const marker = new mapboxgl.Marker(div).setLngLat(markerDetails.coordinates);
      ReactDOM.render(
        <span className="diamond" style={{ borderColor: markerDetails.color }}></span>,
        div,
        () => marker.addTo(this.map)
      );
      return Object.assign(map, { [markerDetails.id]: marker });
    }, {});

    if (markersToBeAdded.length || markersToBeRemoved.length) {
      this.setState({
        markerMap: Object.assign(this.state.markerMap, markerMapAdd, markerMapRemove),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if ((nextProps.fitBounds && !this.props.fitBounds) ||
        (nextProps.fitBounds &&
        nextProps.fitBounds.toString() != this.props.fitBounds.toString())) {
      this.fitBounds(nextProps.fitBounds);
    }
    if (nextProps.bounds.length &&
        nextProps.bounds != this.props.bounds) {
      this.setMaxBounds(nextProps.bounds);
    }
    if (this.state.loaded) {
      this.redrawLayers(nextProps.layers, this.props.layers);
      this.redrawMarkers(nextProps.markers, this.props.markers);
    }
  }

  render() {
    const planItems = [
      {
        top: 2021,
        bottom: 'October',
        color: '#A48EB2',
      },
    ];

    const permitItems = [
      {
        top: 'National Grid' ,
        bottom: 'Oct. 30 - Nov. 14',
        color: '#F26262',
      },
      {
        top: 'Eversource' ,
        bottom: 'Jan. 3 - Jan. 13',
        color: '#45CEEF',
      },
    ];

    return (
      <section className="component Map">
        <div className="map-layer" ref={el => this.mapContainer = el} />

        <MapLabel type="plan" items={planItems} />
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
  fitBounds: PropTypes.object,
};

export default Map;
