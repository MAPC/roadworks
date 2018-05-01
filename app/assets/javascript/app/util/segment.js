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
      (acc, id) => `${acc} and ${roadMap[id].name || 'UNNAMED ROAD'}`,
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
  const distance = (node) => utils.distanceBetweenLocations(
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
      const newPoint = utils.closestPointOnSegment(lineVertex1,lineVertex2, location);
      if (!nodeId2 || utils.distanceBetweenLocations(location, newPoint) < utils.distanceBetweenLocations(location, snappedLocation)) {
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
    if (origIds.length > 1 &&
        origIds.every((id) => finalPath.slice(0, finalPath.length).includes(id))) {
      finalPath = finalPath.slice(origIds.length - 1);
    }
    if (destIds.length > 1 &&
        destIds.every((id) => finalPath.slice(0, finalPath.length).includes(id))) {
      finalPath = finalPath.slice(0, finalPath.length - (destIds.length - 1));
    }
    return finalPath;
  }
};
