import types from '../actions/types';

function loginFormReducer(state = {
  newContributorName: '',
  isPending: false,
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
    default:
      return state;
  }
}

export default loginFormReducer;
