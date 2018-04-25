import {
  decodeId,
} from './id';

export function flatten(arr, depth) {
  return arr.reduce((acc, arr) => {
    return acc.concat(Array.isArray(arr) && depth > 1 ? flatten(arr, depth - 1) : arr);
  }, []);
};

export function getFirstPoint(geometry) {
  const coordinates = ((geometry) => {
    if (geometry.type == 'MultiLineString') {
      return geometry.coordinates[0][0];
    }
    return geometry.coordinates[0];
  })(geometry);
  return {
    type: 'Point',
    coordinates,
  };
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

export function generateUniqueOffsets(kits) {
  // Identify all of the layers attached to each node being used
  const nodesToLayer = kits.reduce((nodesToLayer, kit) =>
    Object.assign(nodesToLayer, kit.nodes.reduce((kitMap, nodeId) =>
      Object.assign(kitMap, {
        [nodeId]: (nodesToLayer[nodeId] ? nodesToLayer[nodeId].concat([kit.layerId]) : [kit.layerId]),
      })
    , {}))
  , {});

  // Identify the overlaps between layers using the same node
  console.log(nodesToLayer);
  const overlaps = Object.values(nodesToLayer).filter((arr) => arr.length > 1);
  console.log(overlaps)
  const overlapsWith = overlaps.reduce((overlapsWith, overlap) =>
    Object.assign(overlapsWith, overlap.reduce((layerMap, layerId, index) => {
      // A layer can only trigger an overlap with layers of different plans
      const others = overlap.slice(0, index)
          .concat(overlap.slice(index + 1, overlap.length));
      const more = overlapsWith[layerId] ? new Set([
        ...overlapsWith[layerId].more,
        ...others.filter((id) =>
          overlapsWith[layerId].more.has(id) ||
          overlapsWith[layerId].once.has(id)),
      ]) : new Set([]);
      const once = overlapsWith[layerId] ? new Set([
        ...overlapsWith[layerId].once,
        ...others,
      ].filter((id) => !more.has(id))) : new Set(others);
      return Object.assign(layerMap, { [layerId]: { once, more } });
    }, {}))
  , {});

  // Assign the lowest available unique offset to each layer
  const offsetMap = Object.keys(overlapsWith).reduce((map, layerId) => {
    const takenOffsets = Array.from(overlapsWith[layerId].more)
        .reduce((taken, id) => map[id] > -1
          ? taken.concat([map[id]])
          : taken, [])
        .sort();
    const lowestAvailable = takenOffsets.reduce((lowest, offset) =>
        (offset == lowest ? lowest + 1 : lowest), 0);
    return Object.assign(map, {
      [layerId]: lowestAvailable,
    });
  }, {});
  return offsetMap;
}

export function formatLayer(id, type, color, geometry, options) {
  switch (type) {
    case 'line':
      const offset = (options && options.offset) || 0;
      const offsetMod = offset % 2;
      const lineOffset = offsetMod
          ? ((offsetMod + (offset - offsetMod) / 2) * 1)
          : ((offsetMod + (offset - offsetMod) / 2) * -1);
      return {
        id,
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
        paint: {
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
        },
      };
    case 'fill':
      return {
        id,
        type,
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry,
          },
        },
        layout: {
        },
        paint: {
          'fill-color': color,
          'fill-opacity': 0.1,
        },
      };
    case 'circle':
      return {
        id,
        type,
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry,
          },
        },
        layout: {
        },
        paint: {
          'circle-color': color,
          'circle-radius': 6,
        },
      };
    default:
      return {};
  }
}

export function getSegmentGeometryAndNodes(segment, roadCache, nodeCache) {
  const road = roadCache[segment.road_id];
  if (segment.nodes.length) {
    const mergedNodeCache = Object.assign({}, nodeCache, segment.custom_nodes);
    return {
      geometry: createGeometryFromNodes(segment.nodes, mergedNodeCache),
      nodes: segment.nodes,
    };
  } else if (road && road.nodes.length) {
    return {
      geometry: road.geojson,
      nodes: road.nodes,
    };
  }
  return {
    geometry: {},
    nodes: [],
  };
}
