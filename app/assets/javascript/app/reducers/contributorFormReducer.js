import types from '../actions/types';
import { LOCATION_CHANGE } from 'react-router-redux';

function loginFormReducer(state = {
  newContributorName: '',
  isPending: false,
  unlockedContributor: null,
}, action) {
  switch (action.type) {
    case types.CONTRIBUTOR_FORM.NEW_CONTRIBUTOR_NAME.CHANGE:
      return Object.assign({}, state, {
        newContributorName: action.newContributorName,
      });
    case types.CONTRIBUTOR_FORM.SET_PENDING:
      return Object.assign({}, state, {
        isPending: action.isPending,
      });
    case types.CONTRIBUTOR_FORM.RESET:
      return Object.assign({}, state, {
        newContributorName: '',
      });
    case types.CONTRIBUTOR_FORM.SET_UNLOCKED_CONTRIBUTOR:
      return Object.assign({}, state, {
        unlockedContributor: state.unlockedContributor == action.id
            ? null
            : action.id,
      });
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        unlockedContributor: null,
      });
    default:
      return state;
  }
}

export default loginFormReducer;
