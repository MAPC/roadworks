export default {
  CITY: {
    UPDATE: 'CITY_UPDATE',
  },
  NODE: {
    BATCH_UPDATE: 'NODE_BATCH_UPDATE',
  },
  ROAD: {
    BATCH_UPDATE: 'ROAD_BATCH_UPDATE',
  },
  WORKING_PLAN: {
    NAME: {
      CHANGE: 'WORKING_PLAN_NAME_CHANGE',
    },
    TYPE: {
      CHANGE: 'WORKING_PLAN_TYPE_CHANGE',
    },
    TIMEFRAME: {
      ADD: 'WORKING_PLAN_TIMEFRAME_ADD',
      REMOVE: 'WORKING_PLAN_TIMEFRAME_REMOVE',
      START: {
        CHANGE: 'WORKING_PLAN_TIMEFRAME_START_CHANGE',
      },
      END: {
        CHANGE: 'WORKING_PLAN_TIMEFRAME_END_CHANGE',
      },
      SEGMENT: {
        ROAD: {
          UPDATE: 'WORKING_PLAN_SEGMENT_ROAD_UPDATE',
        },
        END_POINT: {
          UPDATE: 'WORKING_PLAN_SEGMENT_END_POINT_UPDATE',
        },
        END_POINT_TYPE: {
          UPDATE: 'WORKING_PLAN_SEGMENT_END_POINT_TYPE_UPDATE',
        },
      },
    },
  },
};
