export function encodeId(planId, timeframeIndex, segmentIndex) {
  return `${planId}-${timeframeIndex}-${segmentIndex}`;
}

export function decodeId(id) {
  const [planId, timeframeIndex, segmentIndex] = id.split('-');
  return { planId, timeframeIndex, segmentIndex };
}
