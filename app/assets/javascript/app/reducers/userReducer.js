import types from '../actions/types';

function userReducer(state = {
  email: null,
  authenticated: false,
}, action) {
  switch (action.type) {
    case types.USER.UPDATE:
      console.log(action);
    default:
      return state;
  }
}

export default userReducer;
