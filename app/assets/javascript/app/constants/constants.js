export default {
  MAPBOX_PUBLIC_API_KEY: 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg',
  MAP: {
    MAX_BOUNDS: [[-74.5, 41], [-69, 43]],
    DEFAULT_CENTROID: [-71.0589, 42.3601],
    LABELS: {
      HOURGLASS_YEARS: {
        FULL: 3,
        HALF: 1,
      },
      LOCALESTRING_OPTIONS: { month: 'short', year: 'numeric' },
      // Map labels cannot be within one thousandth lat or lng of another label
      COLLISION_TOLERANCE: 3,
    },
  },
};
