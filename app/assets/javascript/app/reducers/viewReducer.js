import types from '../actions/types';

function roadReducer(state = {
  active: {},
}, action) {
  switch (action.type) {
    case types.FETCH.LOAD_ALL:
    case types.PLAN.BATCH_UPDATE:
      const activePartial = {};
      action.plans.forEach((plan) => {
        activePartial[plan.id] = true;
      });
      return Object.assign({}, state, {
        active: Object.assign({}, state.active, activePartial),
      });
    case types.VIEW.TOGGLE_ACTIVE:
      return Object.assign({}, state, {
        active: Object.assign({}, state.active, {
          [action.id]: !state.active[action.id],
        }),
      });
    default:
      return state
  }
}

export default roadReducer;
