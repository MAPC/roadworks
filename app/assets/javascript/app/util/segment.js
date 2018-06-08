function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  const l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
}

// Distance in km between two points on Earth using the Haversine formula
export function distanceBetweenLocations(location1, location2) {
  // Radius of the earth in km
  var R = 6371;
  const [lng1, lat1] = location1;
  const [lng2, lat2] = location2;
  const degreesLat = degreesToRadians(lat2-lat1);
  const degreesLon = degreesToRadians(lng2-lng1);
  const a = Math.sin(degreesLat / 2) * Math.sin(degreesLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(degreesLon / 2) * Math.sin(degreesLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function distanceToLine(p, v, w) {
  return Math.sqrt(distToSegmentSquared(p, v, w));
}

export function closestPointOnSegment(A, B, P) {
  const AP = [P[0] - A[0], P[1] - A[1]];
  const AB = [B[0] - A[0], B[1] - A[1]];
  const ab2 = AB[0] ** 2 + AB[1] ** 2;
  const ap_ab = AP[0] * AB[0] + AP[1] * AB[1];
  let t = ap_ab / ab2;
  if (t < 0) {
    t = 0;
  } else if (t > 1) {
    t = 1;
  }
  return [A[0] + AB[0] * t, A[1] + AB[1] * t];
}

export function getCrossStreetName(node, roadId, roadMap) {
  const roads = node.part_of.filter(id => id != roadId);
  if (roads.length == 1) {
    // If there's only one connecting road, this could be a town line
    const crossRoad = roadMap[roads[0]];
    const label = crossRoad
        ? (crossRoad.name || 'UNNAMED ROAD')
        : 'Town Line';
    return label;
  } else if (roads.length > 1) {
    // If there are many cross streets for a particular node, string them
    // together to display to the user
    const label = roads.slice(1).reduce(
      (acc, id) => `${acc} and ${roadMap[id] ? roadMap[id].name : 'UNNAMED ROAD'}`,
    (roadMap[roads[0]].name || 'UNNAMED ROAD'));
    return label;
  } else if (node.neighbors.length == 1) {
    // If there are no cross streets for this node, and the node has exactly
    // one neighbor, we must be at the end of the road
    return 'End of Road';
  }
  return null;
};

// Generate a partial node map using the nodes from a particular road
export function partialNodeCacheForRoad(road, nodeCache) {
  const nodeMap = {};
  road.nodes.forEach((nodeId) => {
    nodeMap[nodeId] = nodeCache[nodeId];
  });
  return nodeMap;
};

// Calculate the options for cross streets on a particular road
export function generateCrossStreetOptions(road, nodeMap, roadMap) {
  const nodeIds = road.nodes;
  // Check all of the nodes (even when most of the nodes will not be x-streets)
  const options = nodeIds.reduce((opts, id) => {
    const node = nodeMap[id];
    const label = getCrossStreetName(node, road.id, roadMap);
    return label ? opts.concat({ value: id, label }) : opts;
  }, []);
  return options;
};

export function createCustomNode(partialNodeCache, location, address) {
  const distance = (node) => distanceBetweenLocations(
    location,
    node.geojson.coordinates
  );

  const nodeId1 = parseInt(Object.keys(partialNodeCache).reduce((acc, id) => {
    if (!acc) { return id; }
    return distance(partialNodeCache[id]) < distance(partialNodeCache[acc])
        ? id
        : acc;
  }, null));

  const lineVertex1 = partialNodeCache[nodeId1].geojson.coordinates;
  let snappedLocation;
  let nodeId2;
  partialNodeCache[nodeId1].neighbors.forEach((id) => {
    // If neighbor is on this road
    if (partialNodeCache[id]) {
      const lineVertex2 = partialNodeCache[id].geojson.coordinates;
      const newPoint = closestPointOnSegment(lineVertex1,lineVertex2, location);
      if (!nodeId2 || distanceBetweenLocations(location, newPoint) < distanceBetweenLocations(location, snappedLocation)) {
        snappedLocation = newPoint;
        nodeId2 = id;
      }
    }
  });

  return {
    geojson: { type: 'Point', coordinates: snappedLocation },
    neighbors: [nodeId1, nodeId2],
    address,
  };
}

// Recursively generate a path between two nodes
export function path(nodeMap, visited, origIds, destIds) {
  const origId = origIds[0];
  const destId = destIds[0];
  const base = [origId];
  const newVisited = visited.concat(base)
  if (origId == destId) {
    return base;
  } else {
    const children = nodeMap[origId].neighbors.filter(id => !newVisited.includes(id) && nodeMap[id]);
    let finalPath;
    children.some((child) => {
      const childPath = path(nodeMap, newVisited, [child], [destId]);
      if (childPath) {
        finalPath = base.concat(childPath);
        return true;
      }
      return false;
    });

    if (origIds.length > 1 && finalPath &&
        origIds.every((id) => finalPath.slice(0, finalPath.length).includes(id))) {
      finalPath = finalPath.slice(origIds.length - 1);
    }
    if (destIds.length > 1 && finalPath &&
        destIds.every((id) => finalPath.slice(0, finalPath.length).includes(id))) {
      finalPath = finalPath.slice(0, finalPath.length - (destIds.length - 1));
    }
    return finalPath;
  }
};
