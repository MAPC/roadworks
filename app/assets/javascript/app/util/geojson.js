
export function flatten(arr, depth) {
  return arr.reduce((acc, arr) => {
    return acc.concat(Array.isArray(arr) && depth > 1 ? flatten(arr, depth - 1) : arr);
  }, []);
};

// Use the GeoJSON in the nodes geometries to assemble a LineString
export function createGeometryFromNodes(path, nodeCache) {
  const coordinates = path
      .map(id => nodeCache[id].geojson.coordinates);
  return {
    type: 'LineString',
    coordinates,
  };
};

// Format a line layer for display in Mapbox
export function formatLineLayer(id, version, color, offset, geometry, isDashed) {
  const dashedProps = isDashed ? {
    'line-dasharray': [6, 6],
  } : {};
  const offsetMod = offset % 2;
  const lineOffset = offsetMod
      ? ((offsetMod + (offset - offsetMod) / 2) * 1)
      : ((offsetMod + (offset - offsetMod) / 2) * -1);
  return {
    id,
    version,
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: geometry ,
        properties: {
          lineOffset,
        },
      },
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
      'line-miter-limit': 10,
    },
    paint: Object.assign({}, {
      'line-color': color,
      'line-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8, 1,
        16, 3,
      ],
      'line-offset': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8, ['*', ['get', 'lineOffset'], 2],
        16, ['*', ['get', 'lineOffset'], 4],
      ],
    }, dashedProps),
  };
};

// Format a point layer for display in Mapbox
export function formatPointLayer(id, version, color, coordinates) {
  return {
    id,
    version,
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates,
        },
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

export function formatWorkingSegmentLayers(id, segment, road, nodeCache) {
  if (segment.nodes.length) {
    // If the segment is not the whole road, plot the calculated path between
    // the orig and dest nodes
    const mergedNodeCache = Object.assign({}, nodeCache, segment.custom_nodes);
    const geometry = createGeometryFromNodes(segment.nodes, mergedNodeCache);
    const firstPoint = geometry.coordinates[0];
    const lastPoint = geometry.coordinates[geometry.coordinates.length - 1];
    return [
      formatLineLayer(id, segment.version, '#aaa', 0, road.geojson),
      formatLineLayer(`${id}-s_line`, segment.version, '#f00', 0, geometry),
      formatPointLayer(`${id}-s_start`, segment.version, '#f00', 0, firstPoint),
      formatPointLayer(`${id}-s_end`, segment.version, '#f00', 0, lastPoint),
    ];
  } else if (road && road.nodes.length) {
    // Plot the whole road, if no partial path has been calculated
    return [
      formatLineLayer(id, segment.version, '#f00', 0, road.geojson),
    ];
  }
  return [];
}

export function formatCityLayers(outline, mask) {
  return [{
    id: 'city-mask',
    version: 1,
    type: 'fill',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: mask,
      },
    },
    layout: {
    },
    paint: {
      'fill-color': '#000',
      'fill-opacity': 0.1,
    },
  }, {
    id: 'city-outline',
    version: 1,
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: outline,
      },
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#f5a87c',
      'line-width': 4,
    },
  }];
};

export function formatPlanSegmentLayer(id, segment, offset, roadCache, nodeCache) {
  const geometry = ((segment, roadCache, nodeCache) => {
    const road = roadCache[segment.road_id];
    if (segment.nodes.length) {
      const mergedNodeCache = Object.assign({}, nodeCache, segment.custom_nodes);
      return createGeometryFromNodes(segment.nodes, mergedNodeCache);
    } else if (road && road.nodes.length) {
      return road.geojson;
    }
    return {};
  })(segment, roadCache, nodeCache);
  return formatLineLayer(id, 0, '#ef4579', offset, geometry);
}
