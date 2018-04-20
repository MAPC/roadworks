import types from '../actions/types';

const initialState = window.currentUser 
  ? window.currentUser 
  : { user_id: null, email: null, role: 'utility' };

function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER.UPDATE:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}

export default userReducer;
