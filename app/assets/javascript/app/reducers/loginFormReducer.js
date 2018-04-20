import types from '../actions/types';

function loginFormReducer(state = {
  email: null,
  password: null,
}, action) {
  console.log(state);

  switch (action.type) {
    case types.LOGIN.FORM.EMAIL.CHANGE:
      return Object.assign({}, state, { email: action.email });
    case types.LOGIN.FORM.PASSWORD.CHANGE:
      return Object.assign({}, state, { password: action.password });
    default:
      return state;
  }
}

export default loginFormReducer;
