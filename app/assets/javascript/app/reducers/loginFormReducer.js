import types from '../actions/types';

function loginFormReducer(state = {
  email: '',
  password: '',
}, action) {
  switch (action.type) {
    case types.LOGIN_FORM.EMAIL.CHANGE:
      return Object.assign({}, state, { email: action.email });
    case types.LOGIN_FORM.PASSWORD.CHANGE:
      return Object.assign({}, state, { password: action.password });
    default:
      return state;
  }
}

export default loginFormReducer;
