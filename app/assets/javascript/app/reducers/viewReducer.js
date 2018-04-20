import types from '../actions/types';

function roadReducer(state = {
  hideAllPlans: false,
  hiddenPlans: {},
  hideAllPermitTypes: false,
  hiddenPermitTypes: {},
}, action) {
  switch (action.type) {
    case types.VIEW.TOGGLE_ALL_PLANS:
      return Object.assign({}, state, {
        hideAllPlans: !state.hideAllPlans,
      });
    case types.VIEW.TOGGLE_PLAN:
      return Object.assign({}, state, {
        hiddenPlans: Object.assign({}, state.hiddenPlans, {
          [action.id]: !state.hiddenPlans[action.id],
        }),
      });
    case types.VIEW.TOGGLE_ALL_PERMIT_TYPES:
      return Object.assign({}, state, {
        hideAllPermitTypes: !state.hideAllPermitTypes,
      });
    case types.VIEW.TOGGLE_PERMIT_TYPE:
      return Object.assign({}, state, {
        hiddenPermitTypes: Object.assign({}, state.hiddenPermitTypes, {
          [action.permitType]: !state.hiddenPermitTypes[action.permitType],
        }),
      });
    default:
      return state
  }
}

export default roadReducer;
