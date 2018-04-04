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

export default {
  // Distance in km between two points on Earth using the Haversine formula
  distanceBetweenLocations: (location1, location2) => {
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
  },
  distanceToLine: (p, v, w) => Math.sqrt(distToSegmentSquared(p, v, w)),

  closestPointOnSegment: (A, B, P) => {
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
  },
};
