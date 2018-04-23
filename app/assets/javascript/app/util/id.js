export function encodeId(
  planId,
  timeframeId,
  timeframeIndex,
  segmentId,
  segmentIndex
) {
  return `${planId}-${timeframeId}-${timeframeIndex}-` +
      `${segmentId}-${segmentIndex}`;
}

export function decodeId(id) {
  const [
    planId,
    timeframeId,
    timeframeIndex,
    segmentId,
    segmentIndex,
  ] = id.split('-');
  return { planId, timeframeId, timeframeIndex, segmentId, segmentIndex };
}
