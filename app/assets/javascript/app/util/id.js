const schema = {
  planId: null,
  timeframeId: null,
  timeframeIndex: null,
  segmentId: null,
  segmentIndex: null,
};

const DELIM = '-';

export const encodeId = (...args) =>
    args.slice(0, Object.keys(schema).length).join(DELIM);

export function decodeId(token) {
  const pieces = token.split(DELIM);
  return Object.keys(schema)
      .reduce((map, key, index) => ({
        ...map,
        ...{[key]: pieces[index] || null },
      }), {});
}
