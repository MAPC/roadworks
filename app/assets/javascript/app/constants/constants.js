export default {
  MAPBOX_PUBLIC_API_KEY: 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg',
  MAP: {
    MARKER_MAX_ZOOM: 13,
    MAX_BOUNDS: [[-74.5, 41], [-69, 43]],
    MAX_BOUNDS_AS_MULTIPOLYGON: {
      type: 'MultiPolygon',
      coordinates: [[[[-74.5, 41], [-74.5, 43], [-69, 43], [-69, 41], [-74.5, 41]]]],
    },
    DEFAULT_CENTROID: [-71.0589, 42.3601],
    LABELS: {
      HOURGLASS_YEARS: {
        FULL: 3,
        HALF: 1,
      },
      LOCALESTRING_OPTIONS: { month: 'short', year: 'numeric' },
      // Map labels cannot be within 0.0005 lat or lng of another label
      COLLISION_ROUNDING: 0.0005,
      COLLISION_OFFSET: 0.0001,
    },
  },
  ENABLED_CITIES: [
    'AYER',
    'MILTON',
    'NORTH READING',
    'WESTBOROUGH',
  ],
};
